import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";


import { EquiposHasSitios } from "./EquiposHasSitios";

@Entity()
export class Equipos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  clave: string = "";

  @Column({ type: "text", nullable: false })
  name: string = "";

  @OneToMany(
    () => EquiposHasSitios,
    (equiposHasSitios) => equiposHasSitios.equipos_id
  )
  equiposHasSitios_id?: EquiposHasSitios[];
}
  
