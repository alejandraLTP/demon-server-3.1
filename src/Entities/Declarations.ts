import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn
} from "typeorm";

import { Containers } from "./Containers";
import { Vehicles } from "./Vehicles";
@Entity()
export class Declarations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  consignor: string = "";

  @Column({ type: "text", nullable: true })
  consignee: string = "";

  @Column({ type: "text", nullable: true })
  shipper: string = "";

  @Column({ type: "text", nullable: true })
  owner: string = "";

  @Column({ type: "text", nullable: true })
  goodsDescription: string = "";

  @Column({ type: "text", nullable: true })
  groupId: string = "";

  @Column({ type: "text", nullable: true })
  customsId: string = "";

  //customs_id y group_id son de tablas o ya vienen

  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({nullable: true})
  updatedAt: Date |null= null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  //Relacion con tabla containers
  @OneToMany(() => Containers, (containers) => containers.declarations_id)
  containers_id?: Containers;

  //Relacion con tabla vehicles

  @OneToMany(() => Vehicles, (vehicles) => vehicles.declarations_id,{
    onDelete: "CASCADE",
    nullable: true
  })
  vehicles_id?: Vehicles[]
  
}
