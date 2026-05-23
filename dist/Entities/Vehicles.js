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
exports.Vehicles = void 0;
const typeorm_1 = require("typeorm");
const Declarations_1 = require("./Declarations");
const Drivers_1 = require("./Drivers");
const Perfiles_1 = require("./Perfiles");
const Placas_1 = require("./Placas");
const TargetEvents_1 = require("./TargetEvents");
const Vehicles_types_1 = require("./Vehicles_types");
const Wagons_1 = require("./Wagons");
const Submarcas_1 = require("./Submarcas");
let Vehicles = class Vehicles extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.vehicleNum = "";
        this.vin = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Vehicles = Vehicles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Vehicles.prototype, "vehicleNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Vehicles.prototype, "vin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Vehicles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Vehicles.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Drivers_1.Drivers, (drivers) => drivers.vehicle_id),
    __metadata("design:type", Drivers_1.Drivers)
], Vehicles.prototype, "drivers_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vehicles_types_1.Vehicle_types, (vehicle_types) => vehicle_types.vehicle_id),
    __metadata("design:type", Vehicles_types_1.Vehicle_types)
], Vehicles.prototype, "vehicle_types_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Wagons_1.Wagons, (wagons) => wagons.vehicles),
    __metadata("design:type", Wagons_1.Wagons)
], Vehicles.prototype, "wagons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TargetEvents_1.TargetEvents, (targetEvents) => targetEvents.vehicles, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Vehicles.prototype, "targetEvents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Declarations_1.Declarations, (declarations) => declarations.vehicles_id, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "declarations_id" }),
    __metadata("design:type", Declarations_1.Declarations)
], Vehicles.prototype, "declarations_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Perfiles_1.Perfiles, (perfil) => perfil.vehicles, {}),
    (0, typeorm_1.JoinColumn)({ name: "perfil_id" }),
    __metadata("design:type", Perfiles_1.Perfiles)
], Vehicles.prototype, "perfil", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Submarcas_1.Submarcas, (submarca) => submarca.vehicles, {}),
    (0, typeorm_1.JoinColumn)({ name: "submarca_id" }),
    __metadata("design:type", Submarcas_1.Submarcas)
], Vehicles.prototype, "submarca", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Placas_1.Placas, (placas) => placas.vehicles, {}),
    (0, typeorm_1.JoinColumn)({ name: "placas_id" }),
    __metadata("design:type", Object)
], Vehicles.prototype, "placas_id", void 0);
exports.Vehicles = Vehicles = __decorate([
    (0, typeorm_1.Entity)()
], Vehicles);
//# sourceMappingURL=Vehicles.js.map