import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Audits } from "./Audits";
import { EventHistory } from "./EventHistory";
import { Horarios } from "./Horarios";
import { Roles } from "./Roles";
import { UserHasCustomOperation } from "./UserHasCustomOperation";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  username: string = "";

  @Column({ type: "text", nullable: true })
  num_empleado: string = "";

  @Column({ type: "text", nullable: false })
  password: string = "";

  @Column({ type: "text", nullable: true })
  fullname: string = "";

  @Column({ type: "text", nullable: true, unique: true })
  email: string = "";

  @Column({ type: "boolean", nullable: true })
  statusPass: boolean = false;

  @Column({ type: "boolean", nullable: true })
  statusLogin: boolean = false;

  @Column({ type: "date", nullable: true })
  fecha_inicio?: Date | null = null;

  @Column({ type: "date", nullable: true })
  fecha_fin?: Date | null = null;

  @Column({ type: "boolean", nullable: true })
  isActive: boolean = true;

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date | null = null;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null = null;

  @ManyToOne(() => Roles, (roles) => roles.users, {
    eager: true,
  })
  @JoinColumn({ name: "role_id" })
  roles!: Roles;

  @ManyToOne(() => Horarios, (horarios) => horarios.user, {
    eager: true,
  })
  @JoinColumn({ name: "horarios" })
  horarios?: Horarios;

  @OneToMany(() => EventHistory, (eventHistory) => eventHistory.user, {
    nullable: true,
  })
  eventHistory?: EventHistory[];

  @OneToMany(() => Audits, (audits) => audits.users_id, {
    nullable: true,
  })
  @JoinColumn({ name: "audits_id" })
  audits?: Audits[];

  @OneToMany(
    () => UserHasCustomOperation,
    (userHasCustomOperation) => userHasCustomOperation.user_id,
    {
      nullable: true,
    }
  )
  @JoinColumn({ name: "userHasCustomOperation_id" })
  userHasCustomOperation_id?: UserHasCustomOperation[];
}
