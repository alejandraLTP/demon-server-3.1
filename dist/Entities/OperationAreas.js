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
exports.OperationAreas = void 0;
const typeorm_1 = require("typeorm");
const CustomSectionHasOperation_1 = require("./CustomSectionHasOperation");
let OperationAreas = class OperationAreas extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.name = "";
        this.clave = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.OperationAreas = OperationAreas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OperationAreas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], OperationAreas.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], OperationAreas.prototype, "clave", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OperationAreas.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], OperationAreas.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], OperationAreas.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomSectionHasOperation_1.CustomSectionHasOperation, (customSectionHasOperation) => customSectionHasOperation.operationAreas_id, {}),
    (0, typeorm_1.JoinColumn)({ name: "customSectionHasOperation_id" }),
    __metadata("design:type", Array)
], OperationAreas.prototype, "customHasOperation_id", void 0);
exports.OperationAreas = OperationAreas = __decorate([
    (0, typeorm_1.Entity)()
], OperationAreas);
//# sourceMappingURL=OperationAreas.js.map