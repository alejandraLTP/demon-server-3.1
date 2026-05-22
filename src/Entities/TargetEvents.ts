import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Events } from "./Events";
import { Operators } from "./Operators";
import { OutputFiles } from "./OutputFiles";
import { Vehicles } from "./Vehicles";

@Entity()
export class TargetEvents {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  comment: string = "";
  @Column({ type: "timestamp", nullable: true })
  timeStamp: Date | null = null;
  @CreateDateColumn()
  createdAt: Date = new Date();
  @Column({ type: "text", nullable: true })
  digSign: string = "";
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @OneToMany(() => Operators, (operators) => operators.targetEvents, {
    onDelete: "CASCADE",
  })
  operators?: Operators[];

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.targetEvents, {
    onDelete: "CASCADE",
  })
  vehicles?: Vehicles;

  @ManyToOne(() => Events, (events) => events.targetEvents, {
    onDelete: "CASCADE",
  })
  events?: Events;

  @ManyToOne(() => OutputFiles, (outputFiles) => outputFiles.targetEvents, {
    onDelete: "CASCADE",
  })
  outputFiles?: OutputFiles;
}
