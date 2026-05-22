import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CustomSection } from "./CustomSection";
import { CustomSectionHasOperation } from "./CustomSectionHasOperation";
import { RegionHasCustom } from "./RegionHasCustom";

@Entity()
export class CustomHasCustomSection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @ManyToOne(
    () => RegionHasCustom,
    (RegionHasCustom) => RegionHasCustom.customHasCustomSection_id
  )
  @JoinColumn({ name: "regionHasCustom_id" })
  regionHasCustom_id?: RegionHasCustom;

  @ManyToOne(
    () => CustomSection,
    (customSection) => customSection.customHasCustomSection_id
  )
  @JoinColumn({ name: "customSection_id" })
  customSection_id?: CustomSection;

  @OneToMany(
    () => CustomSectionHasOperation,
    (customSectionHasOperation) =>
      customSectionHasOperation.customHasCustomSection_id,
    {
      onDelete: "CASCADE",
    }
  )
  customSectionHasOperation_id?: CustomSectionHasOperation[];
}
