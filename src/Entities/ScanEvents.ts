import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Events } from "./Events";
import { OcrResults } from "./OcrResults";
import { OutputFiles } from "./OutputFiles";
import { XRayFile } from "./XRayFile";
import { join } from "node:path";

@Entity()
export class ScanEvents {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  scannerCaseId: string = "";

  @Column({ type: "text", nullable: false })
  digsign: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @OneToMany(() => XRayFile, (xRayFile) => xRayFile.scanEvents, {
    onDelete: "CASCADE",
    cascade: true,
  })
  xRayFile?: XRayFile[];

  @ManyToOne(() => OcrResults, (ocrResults) => ocrResults.scanEvents, {
    cascade: true,
  })
  @JoinColumn({ name: "ocrResults_id" })
  ocrResults?: OcrResults;

  @OneToMany(() => OutputFiles, (outputFiles) => outputFiles.scanEvents, {
    onDelete: "CASCADE",
  })
  outputFiles?: OutputFiles[];

  @ManyToOne(() => Events, (events) => events.scanEvents, {
    onDelete: "CASCADE",
  })
  events?: Events;
}
