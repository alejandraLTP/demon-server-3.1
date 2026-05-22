import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CustomHasCustomSection } from "./CustomHasCustomSection";
@Entity()
export class CustomSection extends BaseEntity {
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
    () => CustomHasCustomSection,
    (customHasCustomSection) => customHasCustomSection.customSection_id
  )
  customHasCustomSection_id!: CustomHasCustomSection[];
}
