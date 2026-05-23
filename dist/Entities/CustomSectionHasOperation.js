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
exports.CustomSectionHasOperation = void 0;
const typeorm_1 = require("typeorm");
const CustomHasCustomSection_1 = require("./CustomHasCustomSection");
const OperationAreas_1 = require("./OperationAreas");
const Sitios_1 = require("./Sitios");
const UserHasCustomOperation_1 = require("./UserHasCustomOperation");
let CustomSectionHasOperation = class CustomSectionHasOperation extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.CustomSectionHasOperation = CustomSectionHasOperation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomSectionHasOperation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CustomSectionHasOperation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], CustomSectionHasOperation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], CustomSectionHasOperation.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sitios_1.Sitios, (sitios) => sitios.customSectionHasOperation_id, {
        eager: true,
    }),
    __metadata("design:type", Array)
], CustomSectionHasOperation.prototype, "sitios_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OperationAreas_1.OperationAreas, (operationAreas) => operationAreas.customHasOperation_id, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "operationAreas_id" }),
    __metadata("design:type", OperationAreas_1.OperationAreas)
], CustomSectionHasOperation.prototype, "operationAreas_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomHasCustomSection_1.CustomHasCustomSection, (customHasCustomSection_id) => customHasCustomSection_id.customSectionHasOperation_id),
    (0, typeorm_1.JoinColumn)({ name: "customHasCustomSection_id" }),
    __metadata("design:type", CustomHasCustomSection_1.CustomHasCustomSection)
], CustomSectionHasOperation.prototype, "customHasCustomSection_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserHasCustomOperation_1.UserHasCustomOperation, (userHasCustomOperation) => userHasCustomOperation.customSectionHasOperation_id),
    __metadata("design:type", Array)
], CustomSectionHasOperation.prototype, "userHasCustomOperation_id", void 0);
exports.CustomSectionHasOperation = CustomSectionHasOperation = __decorate([
    (0, typeorm_1.Entity)()
], CustomSectionHasOperation);
//# sourceMappingURL=CustomSectionHasOperation.js.map