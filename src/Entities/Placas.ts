import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados";
import { PlacasHasEvents } from "./PlacaHasEvents";
import { Vehicles } from "./Vehicles";
@Entity()
export class Placas {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", nullable: true })
  placa_f: string | null = null;

  @Column({ type: "varchar", nullable: true })
  placa_t: string | null = null;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.perfil)
  vehicles?: Vehicles[];

  @ManyToOne(() => Estados, (estados) => estados.placas)
  @JoinColumn({ name: "estado_id" })
  estado_id?: Estados;

  //Pivote
  @OneToMany(() => PlacasHasEvents, (placaHasEvents) => placaHasEvents.placas)
  placaHasEvents?: PlacasHasEvents[];
}
