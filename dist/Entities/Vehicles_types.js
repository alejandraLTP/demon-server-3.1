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
exports.Vehicle_types = void 0;
const typeorm_1 = require("typeorm");
const Vehicles_1 = require("./Vehicles");
let Vehicle_types = class Vehicle_types extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.tipo = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Vehicle_types = Vehicle_types;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicle_types.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Vehicle_types.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicle_types.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Vehicle_types.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Vehicle_types.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Vehicles_1.Vehicles, (vehicles) => vehicles.vehicle_types_id),
    __metadata("design:type", Array)
], Vehicle_types.prototype, "vehicle_id", void 0);
exports.Vehicle_types = Vehicle_types = __decorate([
    (0, typeorm_1.Entity)()
], Vehicle_types);
//# sourceMappingURL=Vehicles_types.js.map