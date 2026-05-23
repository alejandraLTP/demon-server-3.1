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
exports.Containers = void 0;
const typeorm_1 = require("typeorm");
const Declarations_1 = require("./Declarations");
const Wagons_1 = require("./Wagons");
let Containers = class Containers extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.position = 0;
        this.containerNum = "";
        this.weight = 0;
        this.length = 0;
        this.declaration = "";
        this.tipo = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Containers = Containers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Containers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Containers.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Containers.prototype, "containerNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: true }),
    __metadata("design:type", Number)
], Containers.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: true }),
    __metadata("design:type", Number)
], Containers.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Containers.prototype, "declaration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Containers.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Containers.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Containers.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Containers.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Declarations_1.Declarations, (declarations) => declarations.containers_id),
    __metadata("design:type", Declarations_1.Declarations)
], Containers.prototype, "declarations_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Wagons_1.Wagons, (wagons) => wagons.containers),
    __metadata("design:type", Wagons_1.Wagons)
], Containers.prototype, "wagons", void 0);
exports.Containers = Containers = __decorate([
    (0, typeorm_1.Entity)()
], Containers);
//# sourceMappingURL=Containers.js.map