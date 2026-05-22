import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {  Events } from "./Events";
import { Annotations } from "./Annotations";
import { Operators } from "./Operators";
import { OutputFiles } from "./OutputFiles";

@Entity()
export class AnalysisEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  name: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({nullable: true})
  updatedAt: Date  |null= null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @OneToMany(() => Operators, (operators) => operators.analysisEvent, {
    onDelete: "CASCADE",
  })
  operators?: Operators;

  @OneToMany(() => Annotations, (annotations) => annotations.analysisEvent, {
    onDelete: "CASCADE",
  })
  annotations?: Annotations;

  @OneToOne(() => Events)
  @JoinColumn()
  events?: Events

  @ManyToOne(() => OutputFiles, (outputFiles) => outputFiles.analysisEvent, {
    onDelete: "CASCADE",
  })
  outputFiles?: OutputFiles;
}
