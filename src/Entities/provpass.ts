import { Column, BaseEntity, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Provpass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: false })
  provpass: string = "";

  @OneToOne(() => User, (user) => user.email, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "email" }) 
  user?: User;
}