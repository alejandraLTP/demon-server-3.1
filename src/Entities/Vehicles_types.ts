import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Vehicles } from "./Vehicles";
@Entity()
export class Vehicle_types extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;
  @Column({ type: "text", nullable: true })
  tipo: string = "";
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.vehicle_types_id)
  vehicle_id?: Vehicles[];
}
