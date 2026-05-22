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
export class Horarios extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "time", nullable: true })
  hora_inicio: string = "";

  @Column({ type: "time", nullable: true })
  hora_fin: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @OneToMany(() => User, (user) => user.horarios, {
    onDelete: "CASCADE",
  })
  user?: User[];
}
