import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";
import { Alarms } from "./Alarms";
import { EventHistory } from "./EventHistory";
import { InspectionSystem } from "./InspectionSystem";
import { ScanEvents } from "./ScanEvents";
import { TargetEvents } from "./TargetEvents";
import { PlacasHasEvents } from "./PlacaHasEvents";
import { Sitios } from "./Sitios";
import { Status } from "./Status";
import { EquiposHasSitios } from "./EquiposHasSitios";
@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "text", nullable: true })
  aduana: string = "";

  @Column({ type: "text", nullable: true })
  region: string = "";

  @Column({ type: "text", nullable: true })
  area: string = "";

  @Column({ type: "text", nullable: true })
  seccion: string = "";

  @Column({ type: "text", nullable: true })
  vpn: string = "";

  @Column({ type: "text", nullable: true })
  eventName: string = "";

  @Column({ type: "text", nullable: false })
  routeFile: string = "";

  @Column({ type: "timestamp", nullable: true })
  dateInspection: Date = new Date();

  @Column({ type: "text", nullable: true })
  Comment: string = "";

  @Column({ type: "text", nullable: true })
  patente: string = "";

  @Column({ type: "text", nullable: true })
  pedimento: string = "";

  @Column({ type: "text", nullable: true })
  Preliminary_Assestment: string = "";

  @Column({ type: "text", nullable: true })
  company: string = "";

  @Column({ type: "text", nullable: true })
  eventKey: string = "";

  @Column({ type: "integer", nullable: true })
  analistId?: number | null;

  @Column({ type: "boolean", default: false })
  is_historic: boolean = false;

  @CreateDateColumn()
  createdAt: Date = new Date();
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null = null;

  @OneToMany(() => Alarms, (alarms) => alarms.events, {
    onDelete: "CASCADE",
    nullable: true,
  })
  alarms?: Alarms[];

  @ManyToOne(() => Sitios, (sitios) => sitios.events_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sitios_id" })
  sitios?: Sitios;

  @Index("IDX_events_equipos")
  @ManyToOne(() => EquiposHasSitios, (equipos) => equipos.events_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "equipo_id" })
  equipos?: EquiposHasSitios;

  @ManyToOne(
    () => InspectionSystem,
    (inspectionSystem) => inspectionSystem.events,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "inspection_system_id" })
  inspectionSystem?: InspectionSystem;

  @OneToMany(() => TargetEvents, (targetEvents) => targetEvents.events, {
    onDelete: "CASCADE",
  })
  targetEvents?: TargetEvents[];

  @OneToMany(() => ScanEvents, (scanEvents) => scanEvents.events, {
    onDelete: "CASCADE",
  })
  scanEvents?: ScanEvents[];

  @OneToMany(() => PlacasHasEvents, (placaHasEvents) => placaHasEvents.events)
  placaHasEvents?: PlacasHasEvents[];

  @OneToMany(() => EventHistory, (eventHistory) => eventHistory.event)
  eventHistory?: EventHistory[];
  @ManyToOne(() => Status, (status) => status.events, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "resp_id" })
  status?: Status;
}
