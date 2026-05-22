import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Declarations } from "./Declarations";
import { Wagons } from "./Wagons";
@Entity()
export class Containers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "int", nullable: true })
  position: number = 0;

  @Column({ type: "text", nullable: true })
  containerNum: string = "";

  @Column({ type: "numeric", nullable: true })
  weight: number = 0;

  @Column({ type: "numeric", nullable: true })
  length: number = 0;

  @Column({ type: "text", nullable: true })
  declaration: string = "";

  @Column({ type: "text", nullable: true })
  tipo: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({nullable: true})
  updatedAt: Date | null = null;

  @DeleteDateColumn({nullable: true})
  deletedAt: Date | null = null;

  @ManyToOne(() => Declarations, (declarations) => declarations.containers_id)
  declarations_id?: Declarations;

  @ManyToOne(() => Wagons, (wagons) => wagons.containers)
  wagons?: Wagons;
}
