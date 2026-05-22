import { AppDataSource } from "../config/ORMConfig";
import { Events } from "../Entities/Events";
import { UserHasCustomOperation } from "../Entities/UserHasCustomOperation";
import { User } from "../Entities/User";
import { Sitios } from "../Entities/Sitios";
import { InspectionSystem } from "../Entities/InspectionSystem";
import { Equipos } from "../Entities/Equipos";
import { QueryRunner } from "typeorm";

/**
 * Función para asignar automáticamente un analista a un evento recién creado
 * 
 * Busca analistas que:
 * 1. Tienen horario activo en el momento actual
 * 2. Están asignados a la configuración aduanera del sitio del evento
 * 3. Tienen el equipo específico asignado (basado en el SerialNumber del evento)
 * 
 * @param event - Evento recién creado sin analista asignado
 * @param sitio - Sitio al que pertenece el evento
 */
export async function assignAnalistaToNewEvent(
  event: Events,
  sitio: Sitios,
  queryRunner?: QueryRunner
): Promise<void> {
  try {
    console.log(`🔍 Buscando analista para evento ${event.id} en sitio ${sitio.id}`);

    const manager = queryRunner?.manager || AppDataSource.manager;

    // Obtener el inspectionSystem del evento
    // Primero intentar usar la relación si está cargada
    let inspectionSystem: InspectionSystem | null = null;
    
    if (event.inspectionSystem) {
      inspectionSystem = event.inspectionSystem;
      console.log(`✅ InspectionSystem cargado desde relación`);
    } else {
      // Si no está cargado, buscar por inspection_system_id
      const eventData = await manager.findOne(Events, {
        where: { id: event.id },
        relations: { inspectionSystem: true }
      });
      
      if (eventData?.inspectionSystem) {
        inspectionSystem = eventData.inspectionSystem;
        console.log(`✅ InspectionSystem cargado desde BD`);
      } else {
        // Último recurso: buscar directamente por ID si está en el objeto
        const inspectionSystemId = (event as any).inspection_system_id || (event as any).inspectionSystemId;
        if (inspectionSystemId) {
          inspectionSystem = await manager.findOne(InspectionSystem, {
            where: { id: inspectionSystemId }
          });
          console.log(`✅ InspectionSystem encontrado por ID: ${inspectionSystemId}`);
        }
      }
    }

    if (!inspectionSystem || !inspectionSystem.SerialNumber) {
      console.log(`⚠️ Evento ${event.id} no tiene inspectionSystem o SerialNumber`);
      console.log(`   Event data:`, { 
        id: event.id, 
        inspection_system_id: (event as any).inspection_system_id,
        hasInspectionSystem: !!event.inspectionSystem 
      });
      return;
    }

    const serialNumber = inspectionSystem.SerialNumber;
    console.log(`📱 Serial Number del evento: ${serialNumber}`);

    // Si el sitio no tiene configuración, no podemos asignar
    const sitioConConfig = await manager
      .createQueryBuilder(Sitios, "s")
      .leftJoinAndSelect("s.customSectionHasOperation_id", "csho")
      .where("s.id = :sitioId", { sitioId: sitio.id })
      .getOne();

    if (!sitioConConfig?.customSectionHasOperation_id) {
      console.log(`⚠️ Sitio ${sitio.id} no tiene customSectionHasOperation asignado`);
      return;
    }

    const configId = sitioConConfig.customSectionHasOperation_id.id;

    // 1. Obtener fecha/hora actual
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentTime = now.toTimeString().substr(0, 8); // HH:MM:SS

    console.log(`📅 Fecha actual: ${today.toISOString().split('T')[0]}, Hora actual: ${currentTime}`);

    // 2. Obtener TODOS los equipos del sitio (no solo uno)
    const equiposDelSitio = await manager
      .createQueryBuilder()
      .select("e.id", "equipo_id")
      .from("equipos", "e")
      .innerJoin("equipos_has_sitios", "ehs", "ehs.\"equiposIdId\" = e.id")
      .where("ehs.\"sitiosIdId\" = :sitioId", { sitioId: sitio.id })
      .andWhere("ehs.\"deletedAt\" IS NULL")
      .getRawMany();

    if (!equiposDelSitio || equiposDelSitio.length === 0) {
      console.log(`⚠️ No se encontraron equipos para sitio ${sitio.id}`);
      return;
    }

    const equiposIdDelSitio = equiposDelSitio.map(e => e.equipo_id);
    console.log(`🔧 Equipos del sitio ${sitio.id}:`, equiposIdDelSitio);

    // 3. Buscar analistas con horario activo HOY en este momento
    // que tengan al menos UNO de los equipos del sitio asignado a esta configuración
      // Buscar analistas con turno activo (incluyendo turnos nocturnos)
      const analistas = await manager
        .createQueryBuilder(User, "u")
        .innerJoin("u.horarios", "h")
        .innerJoin("u.roles", "r")
        .innerJoin("u.userHasCustomOperation_id", "uhco")
        .where("u.deletedAt IS NULL")
        .andWhere("u.fecha_inicio <= :today", { today })
        .andWhere("u.fecha_fin >= :today", { today })
        .andWhere("uhco.customSectionHasOperation_id = :configId", { configId })
        .andWhere("uhco.deletedAt IS NULL")
        // Manejar turnos normales y nocturnos:
        // Si hora_fin >= hora_inicio: turno normal (ej: 08:00-17:00)
        // Si hora_fin < hora_inicio: turno nocturno (ej: 22:00-06:00)
        .andWhere(
          `(
            (h.hora_fin >= h.hora_inicio AND :currentTime >= h.hora_inicio AND :currentTime <= h.hora_fin)
            OR
            (h.hora_fin < h.hora_inicio AND (:currentTime >= h.hora_inicio OR :currentTime <= h.hora_fin))
          )`,
          { currentTime }
        )
        .andWhere("r.name = :rol", { rol: "Analista" })
        .getMany();

    console.log(`👥 Analistas con horario activo: ${analistas.length}`);

    if (analistas.length === 0) {
      console.log(`⚠️ No hay analistas disponibles para evento ${event.id}`);
      return;
    }

    // 4. Filtrar analistas que tengan al menos un equipo del sitio
    for (const analista of analistas) {
      console.log(`🔍 Revisando analista ${analista.id} (${analista.fullname})`);
      
      const asignaciones = await manager
        .createQueryBuilder(UserHasCustomOperation, "uhco")
        .leftJoinAndSelect("uhco.equipos_id", "equipos")
        .where("uhco.user_id = :userId", { userId: analista.id })
        .andWhere("uhco.customSectionHasOperation_id = :configId", { configId })
        .andWhere("uhco.deletedAt IS NULL")
        .getMany();

      console.log(`   📋 Asignaciones encontradas: ${asignaciones.length}`);
      
      const equiposDelAnalista = asignaciones
        .map(a => {
          const eqId = a.equipos_id?.id;
          console.log(`   🔧 Equipo en asignación: ${eqId || 'null'}`);
          return eqId;
        })
        .filter(Boolean);

      console.log(`   📦 Equipos del analista: [${equiposDelAnalista.join(', ')}]`);
      console.log(`   📦 Equipos del sitio: [${equiposIdDelSitio.join(', ')}]`);

      const tieneEquipoDelSitio = equiposDelAnalista.some(
        eqId => equiposIdDelSitio.includes(eqId as number)
      );

      console.log(`   ✅ Tiene equipo del sitio: ${tieneEquipoDelSitio}`);

      if (tieneEquipoDelSitio) {
        // Asignar analista al evento
        event.analistId = analista.id;
        await manager.save(Events, event);
        
        console.log(`✅ Asignado evento ${event.id} a analista ${analista.id} (${analista.fullname})`);
        return;
      }
    }

    console.log(`⚠️ No se encontró analista con equipos del sitio para evento ${event.id}`);
  } catch (error) {
    console.error(`❌ Error asignando analista al evento ${event.id}:`, error);
    // No lanzar error, solo loguear para que no bloquee la creación del evento
  }
}

