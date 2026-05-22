import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Sitios } from "./Sitios";

@Entity()
export class DemonAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string = "";

  @Column({ type: "text" })
  username: string = "";

  @Column({ type: "text" })
  password: string = "";

  @Column({ type: "text", nullable: true })
  tempPassword: string = "";

  @Column({ type: "text", nullable: true })
  passwordVisible: string = "";

  @Column({ type: "text", nullable: true })
  salt: string = "";

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  updatedAt?: Date = new Date();

  @DeleteDateColumn()
  deletedAt?: Date;

  @Index({ unique: true })
  @OneToOne(() => Sitios, (sitio) => sitio.demonAuth)
  @JoinColumn({ name: "sitio_id" })
  sitio?: Sitios;
}
