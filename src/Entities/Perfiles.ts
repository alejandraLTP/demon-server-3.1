import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicles } from "./Vehicles";


@Entity()
export class Perfiles {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  name: string = "";

  @OneToMany(() => Vehicles, (vehicles) => vehicles.perfil) 
  vehicles?: Vehicles[]
}