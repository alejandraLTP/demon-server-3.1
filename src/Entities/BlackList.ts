import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Vehicles } from "./Vehicles";
import { Fuentes } from "../config/constants/enums";
import { PlacasHasEvents } from "./PlacaHasEvents";
@Entity("blacklist")
export class BlackList extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number = 0;

  @Column({ type: "text", unique: true })
  folio: string = "";

  @Column({ type: "timestamptz", nullable: true })
  vigencia_inicio: Date | null = new Date();

  @Column({ type: "timestamptz", nullable: true })
  vigencia_final: Date | null = new Date();

  @Column({ type: "boolean", default: false })
  vencida: boolean = false;

  @Column({ type: "boolean", default: false })
  cancelada: boolean = false;

  @Column({ type: "text", nullable: true })
  comment: string = "";

  @Column({
    type: "enum",
    enum: Fuentes,
    nullable: true,
    default: Fuentes.DEFINIR,
  })
  fuente_info: string = "";

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  updatedAt?: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  deletedAt?: Date | null = null;

  @OneToMany(
    () => PlacasHasEvents,
    (placaHasEvents) => placaHasEvents.blackList
  )
  placaHasEvents?: PlacasHasEvents[];
}
