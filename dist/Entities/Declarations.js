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
exports.Declarations = void 0;
const typeorm_1 = require("typeorm");
const Containers_1 = require("./Containers");
const Vehicles_1 = require("./Vehicles");
let Declarations = class Declarations extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.consignor = "";
        this.consignee = "";
        this.shipper = "";
        this.owner = "";
        this.goodsDescription = "";
        this.groupId = "";
        this.customsId = "";
        //customs_id y group_id son de tablas o ya vienen
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Declarations = Declarations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Declarations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "consignor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "consignee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "shipper", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "goodsDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Declarations.prototype, "customsId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Declarations.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Declarations.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Declarations.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Containers_1.Containers, (containers) => containers.declarations_id),
    __metadata("design:type", Containers_1.Containers)
], Declarations.prototype, "containers_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Vehicles_1.Vehicles, (vehicles) => vehicles.declarations_id, {
        onDelete: "CASCADE",
        nullable: true
    }),
    __metadata("design:type", Array)
], Declarations.prototype, "vehicles_id", void 0);
exports.Declarations = Declarations = __decorate([
    (0, typeorm_1.Entity)()
], Declarations);
//# sourceMappingURL=Declarations.js.map