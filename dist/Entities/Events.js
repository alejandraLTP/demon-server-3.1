"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const typeorm_1 = require("typeorm");
const Alarms_1 = require("./Alarms");
const EventHistory_1 = require("./EventHistory");
const InspectionSystem_1 = require("./InspectionSystem");
const ScanEvents_1 = require("./ScanEvents");
const TargetEvents_1 = require("./TargetEvents");
const PlacaHasEvents_1 = require("./PlacaHasEvents");
const Sitios_1 = require("./Sitios");
const Status_1 = require("./Status");
const EquiposHasSitios_1 = require("./EquiposHasSitios");
let Events = class Events {
    constructor() {
        this.id = 0;
        this.aduana = "";
        this.region = "";
        this.area = "";
        this.seccion = "";
        this.vpn = "";
        this.eventName = "";
        this.routeFile = "";
        this.dateInspection = new Date();
        this.Comment = "";
        this.patente = "";
        this.pedimento = "";
        this.Preliminary_Assestment = "";
        this.company = "";
        this.eventKey = "";
        this.is_historic = false;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Events = Events;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Events.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "aduana", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "seccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "vpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "eventName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Events.prototype, "routeFile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Events.prototype, "dateInspection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "Comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "patente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "pedimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "Preliminary_Assestment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Events.prototype, "eventKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Object)
], Events.prototype, "analistId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Events.prototype, "is_historic", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Events.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Events.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Events.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Alarms_1.Alarms, (alarms) => alarms.events, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Events.prototype, "alarms", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sitios_1.Sitios, (sitios) => sitios.events_id, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "sitios_id" }),
    __metadata("design:type", Sitios_1.Sitios)
], Events.prototype, "sitios", void 0);
__decorate([
    (0, typeorm_1.Index)("IDX_events_equipos"),
    (0, typeorm_1.ManyToOne)(() => EquiposHasSitios_1.EquiposHasSitios, (equipos) => equipos.events_id, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "equipo_id" }),
    __metadata("design:type", EquiposHasSitios_1.EquiposHasSitios)
], Events.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InspectionSystem_1.InspectionSystem, (inspectionSystem) => inspectionSystem.events, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "inspection_system_id" }),
    __metadata("design:type", InspectionSystem_1.InspectionSystem)
], Events.prototype, "inspectionSystem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TargetEvents_1.TargetEvents, (targetEvents) => targetEvents.events, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Events.prototype, "targetEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ScanEvents_1.ScanEvents, (scanEvents) => scanEvents.events, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Events.prototype, "scanEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlacaHasEvents_1.PlacasHasEvents, (placaHasEvents) => placaHasEvents.events),
    __metadata("design:type", Array)
], Events.prototype, "placaHasEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventHistory_1.EventHistory, (eventHistory) => eventHistory.event),
    __metadata("design:type", Array)
], Events.prototype, "eventHistory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Status_1.Status, (status) => status.events, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "resp_id" }),
    __metadata("design:type", Status_1.Status)
], Events.prototype, "status", void 0);
exports.Events = Events = __decorate([
    (0, typeorm_1.Entity)()
], Events);
//# sourceMappingURL=Events.js.map