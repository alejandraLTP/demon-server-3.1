import {
  Column,
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";


import { PlacasHasEvents } from "./PlacaHasEvents";
import { Events } from "./Events";

@Entity()
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  name: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @OneToMany(
    () => PlacasHasEvents,
    (placaHasEvents) => placaHasEvents.status,
    {}
  )
  placaHasEvents?: PlacasHasEvents[];
  @OneToMany(() => Events, (events) => events.status)
  events?: Events[];
}
