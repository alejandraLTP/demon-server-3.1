import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Placas } from "./Placas";

@Entity()
export class Estados {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @OneToMany(() => Placas, (placa) => placa.estado_id)
  placas?: Placas[];
}