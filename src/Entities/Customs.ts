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

//import { Regions } from "./Regions";
import { RegionHasCustom } from "./RegionHasCustom";

@Entity()
export class Customs extends BaseEntity {
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
    () => RegionHasCustom,
    (regionHasCustom) => regionHasCustom.custom_id,
    {}
  )
  regionHasCustom!: RegionHasCustom[];
}
