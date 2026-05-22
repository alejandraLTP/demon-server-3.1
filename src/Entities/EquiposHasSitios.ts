import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Equipos } from "./Equipos";
import { Sitios } from "./Sitios";
import { Location } from "./Location";
@Entity()
export class EquiposHasSitios extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @ManyToOne(() => Sitios, (sitios) => sitios.equiposHasSitios_id)
  sitios_id!: Sitios;

  @ManyToOne(() => Equipos, (equipos) => equipos.equiposHasSitios_id)
  equipos_id!: Equipos;

  @ManyToOne(() => Location, (location) => location.equiposHasSitios_id)
  @JoinColumn({ name: "location_id" })
  location_id!: Location;
}
