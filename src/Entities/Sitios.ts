import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";

import { CustomSectionHasOperation } from "./CustomSectionHasOperation";
import { EquiposHasSitios } from "./EquiposHasSitios";
import { Events } from "./Events";
import { DemonAuth } from "./demonAuth";

@Entity()
export class Sitios extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "boolean", default: true })
  status: boolean = true;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @ManyToOne(
    () => CustomSectionHasOperation,
    (customSectionHasOperation) => customSectionHasOperation.sitios_id
  )
  customSectionHasOperation_id?: CustomSectionHasOperation;

  @OneToMany(
    () => EquiposHasSitios,
    (equiposHasSitios) => equiposHasSitios.sitios_id
  )
  @JoinColumn({ name: "equiposHasSitios_id" })
  equiposHasSitios_id?: EquiposHasSitios[];

  @OneToMany(() => Events, (events) => events.sitios)
  @JoinColumn({ name: "events_id" })
  events_id?: Events[];

  @OneToOne(() => DemonAuth, (demonAuth) => demonAuth.sitio)
  demonAuth?: DemonAuth;
}
