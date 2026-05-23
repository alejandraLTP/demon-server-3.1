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
exports.Sitios = void 0;
const typeorm_1 = require("typeorm");
const CustomSectionHasOperation_1 = require("./CustomSectionHasOperation");
const EquiposHasSitios_1 = require("./EquiposHasSitios");
const Events_1 = require("./Events");
const demonAuth_1 = require("./demonAuth");
let Sitios = class Sitios extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.status = true;
        this.createdAt = new Date();
        this.deletedAt = null;
        this.updatedAt = null;
    }
};
exports.Sitios = Sitios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sitios.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Sitios.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sitios.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Sitios.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Sitios.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomSectionHasOperation_1.CustomSectionHasOperation, (customSectionHasOperation) => customSectionHasOperation.sitios_id),
    __metadata("design:type", CustomSectionHasOperation_1.CustomSectionHasOperation)
], Sitios.prototype, "customSectionHasOperation_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EquiposHasSitios_1.EquiposHasSitios, (equiposHasSitios) => equiposHasSitios.sitios_id),
    (0, typeorm_1.JoinColumn)({ name: "equiposHasSitios_id" }),
    __metadata("design:type", Array)
], Sitios.prototype, "equiposHasSitios_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Events_1.Events, (events) => events.sitios),
    (0, typeorm_1.JoinColumn)({ name: "events_id" }),
    __metadata("design:type", Array)
], Sitios.prototype, "events_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => demonAuth_1.DemonAuth, (demonAuth) => demonAuth.sitio),
    __metadata("design:type", demonAuth_1.DemonAuth)
], Sitios.prototype, "demonAuth", void 0);
exports.Sitios = Sitios = __decorate([
    (0, typeorm_1.Entity)()
], Sitios);
//# sourceMappingURL=Sitios.js.map