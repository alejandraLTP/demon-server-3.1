"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignAnalistaToNewEvent = assignAnalistaToNewEvent;
const ORMConfig_1 = require("../config/ORMConfig");
const Events_1 = require("../Entities/Events");
const UserHasCustomOperation_1 = require("../Entities/UserHasCustomOperation");
const User_1 = require("../Entities/User");
const Sitios_1 = require("../Entities/Sitios");
const InspectionSystem_1 = require("../Entities/InspectionSystem");
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
function assignAnalistaToNewEvent(event, sitio, queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`🔍 Buscando analista para evento ${event.id} en sitio ${sitio.id}`);
            const manager = (queryRunner === null || queryRunner === void 0 ? void 0 : queryRunner.manager) || ORMConfig_1.AppDataSource.manager;
            // Obtener el inspectionSystem del evento
            // Primero intentar usar la relación si está cargada
            let inspectionSystem = null;
            if (event.inspectionSystem) {
                inspectionSystem = event.inspectionSystem;
                console.log(`✅ InspectionSystem cargado desde relación`);
            }
            else {
                // Si no está cargado, buscar por inspection_system_id
                const eventData = yield manager.findOne(Events_1.Events, {
                    where: { id: event.id },
                    relations: { inspectionSystem: true }
                });
                if (eventData === null || eventData === void 0 ? void 0 : eventData.inspectionSystem) {
                    inspectionSystem = eventData.inspectionSystem;
                    console.log(`✅ InspectionSystem cargado desde BD`);
                }
                else {
                    // Último recurso: buscar directamente por ID si está en el objeto
                    const inspectionSystemId = event.inspection_system_id || event.inspectionSystemId;
                    if (inspectionSystemId) {
                        inspectionSystem = yield manager.findOne(InspectionSystem_1.InspectionSystem, {
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
                    inspection_system_id: event.inspection_system_id,
                    hasInspectionSystem: !!event.inspectionSystem
                });
                return;
            }
            const serialNumber = inspectionSystem.SerialNumber;
            console.log(`📱 Serial Number del evento: ${serialNumber}`);
            // Si el sitio no tiene configuración, no podemos asignar
            const sitioConConfig = yield manager
                .createQueryBuilder(Sitios_1.Sitios, "s")
                .leftJoinAndSelect("s.customSectionHasOperation_id", "csho")
                .where("s.id = :sitioId", { sitioId: sitio.id })
                .getOne();
            if (!(sitioConConfig === null || sitioConConfig === void 0 ? void 0 : sitioConConfig.customSectionHasOperation_id)) {
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
            const equiposDelSitio = yield manager
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
            const analistas = yield manager
                .createQueryBuilder(User_1.User, "u")
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
                .andWhere(`(
            (h.hora_fin >= h.hora_inicio AND :currentTime >= h.hora_inicio AND :currentTime <= h.hora_fin)
            OR
            (h.hora_fin < h.hora_inicio AND (:currentTime >= h.hora_inicio OR :currentTime <= h.hora_fin))
          )`, { currentTime })
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
                const asignaciones = yield manager
                    .createQueryBuilder(UserHasCustomOperation_1.UserHasCustomOperation, "uhco")
                    .leftJoinAndSelect("uhco.equipos_id", "equipos")
                    .where("uhco.user_id = :userId", { userId: analista.id })
                    .andWhere("uhco.customSectionHasOperation_id = :configId", { configId })
                    .andWhere("uhco.deletedAt IS NULL")
                    .getMany();
                console.log(`   📋 Asignaciones encontradas: ${asignaciones.length}`);
                const equiposDelAnalista = asignaciones
                    .map(a => {
                    var _a;
                    const eqId = (_a = a.equipos_id) === null || _a === void 0 ? void 0 : _a.id;
                    console.log(`   🔧 Equipo en asignación: ${eqId || 'null'}`);
                    return eqId;
                })
                    .filter(Boolean);
                console.log(`   📦 Equipos del analista: [${equiposDelAnalista.join(', ')}]`);
                console.log(`   📦 Equipos del sitio: [${equiposIdDelSitio.join(', ')}]`);
                const tieneEquipoDelSitio = equiposDelAnalista.some(eqId => equiposIdDelSitio.includes(eqId));
                console.log(`   ✅ Tiene equipo del sitio: ${tieneEquipoDelSitio}`);
                if (tieneEquipoDelSitio) {
                    // Asignar analista al evento
                    event.analistId = analista.id;
                    yield manager.save(Events_1.Events, event);
                    console.log(`✅ Asignado evento ${event.id} a analista ${analista.id} (${analista.fullname})`);
                    return;
                }
            }
            console.log(`⚠️ No se encontró analista con equipos del sitio para evento ${event.id}`);
        }
        catch (error) {
            console.error(`❌ Error asignando analista al evento ${event.id}:`, error);
            // No lanzar error, solo loguear para que no bloquee la creación del evento
        }
    });
}
//# sourceMappingURL=eventAssignmentService.js.map