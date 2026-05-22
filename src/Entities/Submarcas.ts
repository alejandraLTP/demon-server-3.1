import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Marcas } from "./Marcas";
import { Vehicles } from "./Vehicles";

@Entity()
export class Submarcas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @ManyToOne(() => Marcas, (marcas) => marcas.submarcas)
  @JoinColumn({ name: "marca_id" })
  marca_id?: Marcas;

  @OneToMany(() => Marcas, (marcas) => marcas.submarcas)
  vehicles?: Vehicles[];
}
