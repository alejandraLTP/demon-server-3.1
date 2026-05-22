import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn
} from "typeorm";
import { Vehicles } from "./Vehicles";
@Entity()
export class Drivers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;
  @Column({ type: "text", nullable: false })
  firstName: string = "";
  @Column({ type: "text", nullable: false })
  lastName: string = "";
  @Column({ type: "text", nullable: false })
  address: string = "";
  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({nullable: true})
  updatedAt: Date |null= null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;
  @ManyToOne(() => Vehicles, (vehicles) => vehicles.drivers_id)
  vehicle_id?: Vehicles;
}
