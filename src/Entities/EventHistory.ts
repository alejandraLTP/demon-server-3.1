
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
import { Events } from "./Events";
import { User } from "./User";

@Entity()
export class EventHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;


  @Column({ type: "timestamp", nullable: true })
  dateTimeInit: Date = new Date();


  @Column({ type: "timestamp", nullable: true })
  dateTimeEnd: Date = new Date();

  @Column({ type: "boolean", nullable: true })
  status: boolean = false;

  @ManyToOne(() => Events, (events) => events.eventHistory, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "event_id" })
  event?: Events;

  @ManyToOne(() => User, (user) => user.eventHistory, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user?: User;
}
