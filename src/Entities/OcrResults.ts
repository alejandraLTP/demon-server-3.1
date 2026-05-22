import { Column,BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { ScanEvents } from "./ScanEvents";

@Entity()
export class OcrResults extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  ocrType: string = "";

  @Column({ type: "text", nullable: false })
  value: string = "";

  @Column({ type: "text", nullable: true })
  confidence: string = "";

  @Column({ type: "text", nullable: true })
  plateLocation: string = "";

  @Column({ type: "text", nullable: true })
  timeStamp: string = "";

  @Column({ type: "text", nullable: true })
  lprDetail: string = "";

  @Column({ type: "text", nullable: true })
  ccrDetail: string = "";

  @Column({ type: "text", nullable: true })
  state: string = "";
   @CreateDateColumn()
    createdAt: Date = new Date();
    @UpdateDateColumn({nullable: true})
    updatedAt: Date |null= null;
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null = null;
  @OneToMany(() => ScanEvents, (scanEvents) => scanEvents.ocrResults, {
    onDelete: "CASCADE",
  })
  scanEvents?: ScanEvents[];
}
