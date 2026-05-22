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

//import { Customs } from "./Customs";
import { RegionHasCustom } from "./RegionHasCustom";
@Entity()
export class Regions extends BaseEntity {
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

  // @OneToMany(() => Customs, (customs) => customs.region)
  // customs!: Customs;

  @OneToMany(
    () => RegionHasCustom,
    (regionHasCustom) => regionHasCustom.region_id
  )
  regionHasCustom!: RegionHasCustom[];
}
