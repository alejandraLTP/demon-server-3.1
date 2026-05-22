import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicles } from "./Vehicles";
import { Submarcas } from "./Submarcas";

@Entity()
export class Marcas {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @OneToMany(() => Submarcas, (submarcas) => submarcas.marca_id)
  submarcas?: Submarcas[];
}