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
import { CustomHasCustomSection } from "./CustomHasCustomSection";
import { OperationAreas } from "./OperationAreas";
import { Sitios } from "./Sitios";
import { UserHasCustomOperation } from "./UserHasCustomOperation";

@Entity()
export class CustomSectionHasOperation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @OneToMany(() => Sitios, (sitios) => sitios.customSectionHasOperation_id, {
    eager: true,
  })
  sitios_id?: Sitios[];

  @ManyToOne(
    () => OperationAreas,
    (operationAreas) => operationAreas.customHasOperation_id,
    {
      eager: true,
    }
  )
  @JoinColumn({ name: "operationAreas_id" })
  operationAreas_id?: OperationAreas;

  @ManyToOne(
    () => CustomHasCustomSection,
    (customHasCustomSection_id) =>
      customHasCustomSection_id.customSectionHasOperation_id
  )
  @JoinColumn({ name: "customHasCustomSection_id" })
  customHasCustomSection_id?: CustomHasCustomSection;

  @OneToMany(
    () => UserHasCustomOperation,
    (userHasCustomOperation) =>
      userHasCustomOperation.customSectionHasOperation_id
  )
  userHasCustomOperation_id?: UserHasCustomOperation[];
}
