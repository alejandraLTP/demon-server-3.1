import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Declarations } from "./Declarations";
import { Drivers } from "./Drivers";
import { Perfiles } from "./Perfiles";
import { Placas } from "./Placas";
import { TargetEvents } from "./TargetEvents";
import { Vehicle_types } from "./Vehicles_types";
import { Wagons } from "./Wagons";

import { Submarcas } from "./Submarcas";
@Entity()
export class Vehicles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  vehicleNum: string = "";

  @Column({ type: "text", nullable: true })
  vin: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @OneToMany(() => Drivers, (drivers) => drivers.vehicle_id)
  drivers_id?: Drivers;

  @ManyToOne(() => Vehicle_types, (vehicle_types) => vehicle_types.vehicle_id)
  vehicle_types_id?: Vehicle_types;

  @OneToMany(() => Wagons, (wagons) => wagons.vehicles)
  wagons?: Wagons;

  @OneToMany(() => TargetEvents, (targetEvents) => targetEvents.vehicles, {
    onDelete: "CASCADE",
  })
  targetEvents?: TargetEvents[];

  @ManyToOne(() => Declarations, (declarations) => declarations.vehicles_id, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "declarations_id" })
  declarations_id?: Declarations;

  @ManyToOne(() => Perfiles, (perfil) => perfil.vehicles, {})
  @JoinColumn({ name: "perfil_id" })
  perfil?: Perfiles;

  //Submarcas
  @ManyToOne(() => Submarcas, (submarca) => submarca.vehicles, {})
  @JoinColumn({ name: "submarca_id" })
  submarca?: Submarcas;

  //Placas
  @ManyToOne(() => Placas, (placas) => placas.vehicles, {})
  @JoinColumn({ name: "placas_id" })
  placas_id?: Placas | null;
}
