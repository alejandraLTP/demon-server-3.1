import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquiposHasSitios} from "./EquiposHasSitios";
@Entity()
export class Location extends BaseEntity { 
  @PrimaryGeneratedColumn()
  id: number = 0
  
  @Column({ type: "text", nullable: true })
  location: string = ""
  
  @Column({ type: "text", nullable: true })
  longitude: string = ""

  @OneToMany(() => EquiposHasSitios, (equiposHasSitios) => equiposHasSitios.location_id)
  equiposHasSitios_id?: EquiposHasSitios[]


}