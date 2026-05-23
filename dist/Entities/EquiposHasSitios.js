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
exports.EquiposHasSitios = void 0;
const typeorm_1 = require("typeorm");
const Equipos_1 = require("./Equipos");
const Sitios_1 = require("./Sitios");
const Location_1 = require("./Location");
const Events_1 = require("./Events");
let EquiposHasSitios = class EquiposHasSitios extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.EquiposHasSitios = EquiposHasSitios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EquiposHasSitios.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], EquiposHasSitios.prototype, "serie", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EquiposHasSitios.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], EquiposHasSitios.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], EquiposHasSitios.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sitios_1.Sitios, (sitios) => sitios.equiposHasSitios_id),
    __metadata("design:type", Sitios_1.Sitios)
], EquiposHasSitios.prototype, "sitios_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipos_1.Equipos, (equipos) => equipos.equiposHasSitios_id),
    __metadata("design:type", Equipos_1.Equipos)
], EquiposHasSitios.prototype, "equipos_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Location_1.Location, (location) => location.equiposHasSitios_id),
    (0, typeorm_1.JoinColumn)({ name: "location_id" }),
    __metadata("design:type", Location_1.Location)
], EquiposHasSitios.prototype, "location_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Events_1.Events, (events) => events.equipos),
    __metadata("design:type", Array)
], EquiposHasSitios.prototype, "events_id", void 0);
exports.EquiposHasSitios = EquiposHasSitios = __decorate([
    (0, typeorm_1.Entity)()
], EquiposHasSitios);
//# sourceMappingURL=EquiposHasSitios.js.map