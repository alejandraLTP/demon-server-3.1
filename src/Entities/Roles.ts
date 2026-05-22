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
import { User } from "./User";


@Entity()
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  name: string = "";

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null = null;

  @OneToMany(() => User, (user) => user.roles, {
    onDelete: "CASCADE",
  })
  users?: User[];
}
