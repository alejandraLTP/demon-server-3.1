import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ScanEvents } from "./ScanEvents";
import { ImageEdits } from "./ImageEdits";
@Entity()
export class XRayFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  uri: string = "";

  @Column({ type: "text", nullable: false })
  type: string = "";

  @Column({ type: "text", nullable: true })
  view: string = "";

  @Column({ type: "text", nullable: true })
  energy: string = "";

  @Column({ type: "text", nullable: true })
  modality: string = "";

  @Column({ type: "text", nullable: true })
  hemdInfo: string = "";

  // @ManyToOne(() => ScanEvents, (scanEvents) => scanEvents.xRayFile, {
  //   onDelete: "CASCADE",
  // })
  // scanEvents?: ScanEvents;
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @ManyToOne(() => ScanEvents, (scanEvents) => scanEvents.xRayFile, {
    onDelete: "CASCADE",
  })
  scanEvents?: ScanEvents;
  @OneToMany(() => ImageEdits, (imageEdits) => imageEdits.xRayFile, {})
  imageEdits?: ImageEdits[];
}
