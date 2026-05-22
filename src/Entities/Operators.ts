import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { AnalysisEvent } from "./AnalysisEvent";
import { TargetEvents } from "./TargetEvents";

@Entity()
export class Operators extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  FirstName: string = "";

  @Column({ type: "text", nullable: false })
  LastName: string = "";

  @Column({ type: "text", nullable: true })
  LoginName: string = "";

  @Column({ type: "text", nullable: true })
  Role: string = "";

  @Column({ type: "text", nullable: true })
  Company: string = "";
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({nullable: true})
  updatedAt: Date |null= null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @ManyToOne(() => TargetEvents, (targetEvents) => targetEvents.operators, {
    onDelete: "CASCADE",
  })
  targetEvents?: TargetEvents;

  @ManyToOne(() => AnalysisEvent, (analysisEvent) => analysisEvent.operators, {
    onDelete: "CASCADE",
  })
  analysisEvent?: AnalysisEvent;
}
