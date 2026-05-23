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
exports.Wagons = void 0;
const typeorm_1 = require("typeorm");
const Containers_1 = require("./Containers");
const Vehicles_1 = require("./Vehicles");
let Wagons = class Wagons extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.Declaration = "";
        this.TrainId = "";
        this.WagonId = "";
        this.Weight = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Wagons = Wagons;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wagons.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Wagons.prototype, "Declaration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Wagons.prototype, "TrainId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Wagons.prototype, "WagonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Wagons.prototype, "Weight", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Wagons.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Wagons.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Wagons.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Containers_1.Containers, (containers) => containers.wagons),
    __metadata("design:type", Containers_1.Containers)
], Wagons.prototype, "containers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vehicles_1.Vehicles, (vehicles) => vehicles.wagons),
    __metadata("design:type", Vehicles_1.Vehicles)
], Wagons.prototype, "vehicles", void 0);
exports.Wagons = Wagons = __decorate([
    (0, typeorm_1.Entity)()
], Wagons);
//# sourceMappingURL=Wagons.js.map