import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { XRayFile } from "./XRayFile";


@Entity()
export class Scan {
  // @PrimaryGeneratedColumn("uuid")
  // id: string = "";
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", length: 255, nullable: true })
  EventId: string = "";

  @Column({ type: "date", nullable: true })
  dateScanned: Date = new Date();

  @Column({ type: "varchar", length: 50, nullable: true })
  hourScanned: string = "";

  @Column("simple-array", { default: [] })
  OCRResult?: string[];

  @Column("simple-array", { default: [] })
  OutputFile?: string[];
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @OneToMany(() => XRayFile, (xrayFiles) => xrayFiles.scanEvents)
  xrayFiles?: Scan;
}
