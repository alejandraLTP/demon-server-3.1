import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,

} from "typeorm";

import { Containers } from "./Containers";
import { Vehicles } from "./Vehicles";
@Entity()
export class Wagons extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  Declaration: string = "";

  @Column({ type: "text", nullable: true })
  TrainId: string = "";

  @Column({ type: "text", nullable: true })
  WagonId: string = "";

  @Column({ type: "text", nullable: true })
  Weight: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({nullable: true})
  updatedAt: Date |null= null;
  @DeleteDateColumn({nullable: true})
  deletedAt: Date |null= null;

  @OneToMany(() => Containers, (containers) => containers.wagons)
  containers?: Containers;

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.wagons)
  vehicles?: Vehicles;
}
