import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  
} from "typeorm";

import { AnalysisEvent } from "./AnalysisEvent";

@Entity()
export class Annotations extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  Description: string = "";

  @Column({ type: "text", nullable: false })
  Comment: string = "";

  @Column({ type: "text", nullable: false })
  FileURI: string = "";

  @Column({ type: "text", nullable: false })
  Shape: string = "";

  @Column({ type: "text", nullable: false })
  BoundingBox: string = "";

  @Column({ type: "text", nullable: false })
  Digsign: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({nullable : true})
  updatedAt: Date |null= null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @ManyToOne(
    () => AnalysisEvent,
    (analysisEvent) => analysisEvent.annotations,
    {
      onDelete: "CASCADE",
    }
  )
  analysisEvent?: AnalysisEvent;
}
