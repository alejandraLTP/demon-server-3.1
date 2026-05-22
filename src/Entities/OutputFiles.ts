import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AnalysisEvent } from "./AnalysisEvent";
import { ScanEvents } from "./ScanEvents";
import { TargetEvents } from "./TargetEvents";
import { ImageEdits } from "./ImageEdits";

@Entity()
export class OutputFiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  Type: string = "";

  @Column({ type: "text", nullable: false })
  View: string = "";

  @Column({ type: "text", nullable: false })
  Hash: string = "";
  @Column({ type: "text", nullable: true })
  URI: string = "";
  @Column({ type: "text", nullable: true })
  Name: string = "";
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @OneToMany(
    () => AnalysisEvent,
    (analysisEvent) => analysisEvent.outputFiles,
    {
      onDelete: "CASCADE",
    }
  )
  analysisEvent?: AnalysisEvent;

  @OneToMany(() => TargetEvents, (targetEvents) => targetEvents.outputFiles, {
    onDelete: "CASCADE",
  })
  targetEvents?: TargetEvents;

  @ManyToOne(() => ScanEvents, (scanEvents) => scanEvents.outputFiles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scanEvents_id" })
  scanEvents?: ScanEvents;
  @OneToMany(() => ImageEdits, (imageEdits) => imageEdits.outputFiles)
  imageEdits?: ImageEdits[];
}
