// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from "typeorm";

// import { Alarms } from "./UffEntities/Alarms";
// import { AnalysisEvent } from "./UffEntities/AnalysisEvent";
// import { CustomSection } from "./UffEntities/CustomSection";
// import { Customs } from "./UffEntities/Customs";
// import { EventHistory } from "./UffEntities/EventHistory";
// import { InspectionSystem } from "./UffEntities/InspectionSystem";
// import { OperationAreas } from "./UffEntities/OperationAreas";
// import { Regions } from "./UffEntities/Regions";
// import { ScanEvents } from "./UffEntities/ScanEvents";
// import { Status } from "./UffEntities/Status";
// import { TargetEvents } from "./UffEntities/TargetEvents";

// @Entity()
// export class UFF {
//   @PrimaryGeneratedColumn()
//   id: number = 0;

//   @Column({ type: "text", nullable: true })
//   vpn: string = "";

//   @Column({ type: "text", nullable: true })
//   eventid: string = "";

//   @Column({ type: "text", nullable: true })
//   routefile: string = "";

//   @Column({ type: "date", nullable: true })
//   dateinspection: Date = new Date();

//   @Column({ type: "text", nullable: true })
//   comment: string = "";

//   @Column({ type: "text", nullable: true })
//   preliminaryassestment: string = "";

//   @ManyToOne(() => EventHistory, (events) => events.events, {
//     onDelete: "CASCADE",
//   })
//   eventHistory?: EventHistory;

//   @ManyToOne(() => Alarms, (alarms) => alarms.events, {
//     onDelete: "CASCADE",
//   })
//   alarms?: Alarms;

//   @OneToMany(() => Status, (status) => status.events, {
//     onDelete: "CASCADE",
//   })
//   status?: Status;

//   @OneToMany(() => OperationAreas, (operationAreas) => operationAreas.events, {
//     onDelete: "CASCADE",
//   })
//   operationAreas?: OperationAreas;

//   @OneToMany(() => CustomSection, (customSection) => customSection.events, {
//     onDelete: "CASCADE",
//   })
//   customSection?: CustomSection;

//   @OneToMany(() => Customs, (custom) => custom.events, {
//     onDelete: "CASCADE",
//   })
//   custom?: Customs;

//   @OneToMany(() => Regions, (regions) => regions.events, {
//     onDelete: "CASCADE",
//   })
//   regions?: Regions;

//   @OneToMany(
//     () => InspectionSystem,
//     (inspectionSystem) => inspectionSystem.events,
//     {
//       onDelete: "CASCADE",
//     }
//   )
//   @JoinColumn()
//   inspectionSystem?: InspectionSystem[];

//   @OneToMany(() => AnalysisEvent, (analysisEvent) => analysisEvent.events, {
//     onDelete: "CASCADE",
//   })
//   analysisEvent?: AnalysisEvent;

//   @OneToMany(() => TargetEvents, (targetEvents) => targetEvents.events, {
//     onDelete: "CASCADE",
//   })
//   targetEvents?: TargetEvents[];

//   @OneToMany(() => ScanEvents, (scanEvents) => scanEvents.events, {
//     onDelete: "CASCADE",
//   })
//   scanEvents?: ScanEvents[];
// }
