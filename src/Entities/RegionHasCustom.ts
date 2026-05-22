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

import { Customs } from "./Customs";
import { Regions } from "./Regions";
import { CustomHasCustomSection } from "./CustomHasCustomSection";

@Entity()
export class RegionHasCustom extends BaseEntity {
  map(arg0: (el: any) => any): any {
    throw new Error("Method not implemented.");
  }

  @PrimaryGeneratedColumn()
  id: number = 0;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @ManyToOne(() => Regions, (regions) => regions.regionHasCustom, {})
  @JoinColumn({ name: "region_id" })
  region_id!: Regions;

  @ManyToOne(() => Customs, (customs) => customs.regionHasCustom)
  @JoinColumn({ name: "custom_id" })
  custom_id!: Customs;

  @OneToMany(
    () => CustomHasCustomSection,
    (customHasCustomSection) => customHasCustomSection.regionHasCustom_id,
    {}
  )
  customHasCustomSection_id?: CustomHasCustomSection[];
}
