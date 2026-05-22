import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CustomSectionHasOperation } from "./CustomSectionHasOperation";
import { User } from "./User";
import { Equipos } from "./Equipos";

@Entity()
export class UserHasCustomOperation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @ManyToOne(() => User, (user) => user.id, {})
  @JoinColumn({ name: "user_id" })
  user_id?: User;

  @ManyToOne(
    () => CustomSectionHasOperation,
    (customSectionHasOperation) =>
      customSectionHasOperation.userHasCustomOperation_id
  )
  @JoinColumn({ name: "customSectionHasOperation_id" })
  customSectionHasOperation_id?: CustomSectionHasOperation;

  @ManyToOne(() => Equipos, { nullable: true })
  @JoinColumn({ name: "equipos_id" })
  equipos_id?: Equipos;
}
