import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CustomSectionHasOperation } from "./CustomSectionHasOperation";

@Entity()
export class OperationAreas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  name: string = "";

  @Column({ type: "text", nullable: true })
  clave: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @OneToMany(
    () => CustomSectionHasOperation,
    (customSectionHasOperation) => customSectionHasOperation.operationAreas_id,
    {}
  )
  @JoinColumn({ name: "customSectionHasOperation_id" })
  customHasOperation_id!: CustomSectionHasOperation[];
}
