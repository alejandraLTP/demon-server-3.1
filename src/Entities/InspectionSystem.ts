import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Events } from "./Events";
@Entity()
export class InspectionSystem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  Manufacturer: string = "";

  @Column({ type: "text", nullable: true })
  ModelName: string = "";

  @Column({ type: "text", nullable: true })
  SerialNumber: string = "";

  @Column({ type: "text", nullable: true })
  Identifier: string = "";

  @Column({ type: "text", nullable: true })
  Latitude: string = "";

  @Column({ type: "text", nullable: true })
  Longitude: string = "";

  @Column({ type: "text", nullable: true })
  Country: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @OneToMany(() => Events, (events) => events.inspectionSystem, {
    onDelete: "CASCADE",
  })
  events?: Events[];
}
