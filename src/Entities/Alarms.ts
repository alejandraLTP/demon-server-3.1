import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Events } from "./Events";
import { join } from "path";

@Entity()
export class Alarms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  Enable_user: string = "";

  @Column({ type: "text", nullable: true })
  Disable_user: string = "";

  @Column({ type: "text", nullable: true })
  Enable_time: string = "";

  @Column({ type: "text", nullable: true })
  Disable_time: string = "";

  // @OneToMany(() => Events, (events) => events.alarms, {
  //   onDelete: "CASCADE",
  // })
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({nullable: true})
  updatedAt: Date |null= null
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @ManyToOne(() => Events, (events) => events.alarms, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "event_id" })
  events?: Events;
}
