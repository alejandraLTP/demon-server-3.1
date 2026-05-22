import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", length: 20 })
  reportType: string = "";

  @Column({ type: "varchar", length: 20, nullable: true })
  plateNumber: string | null = "";

  @Column({ type: "timestamp", nullable: true })
  startDate: Date | null = new Date();

  @Column({ type: "timestamp", nullable: true })
  endDate: Date | null = new Date();

  @Column({ type: "varchar", length: 255 })
  excelPath: string = "";

  @Column({ type: "varchar", length: 255 })
  pdfPath: string = "";

  @Column({ type: "varchar", length: 100 })
  generatedBy: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();
}
