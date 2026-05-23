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
exports.CustomHasCustomSection = void 0;
const typeorm_1 = require("typeorm");
const CustomSection_1 = require("./CustomSection");
const CustomSectionHasOperation_1 = require("./CustomSectionHasOperation");
const RegionHasCustom_1 = require("./RegionHasCustom");
let CustomHasCustomSection = class CustomHasCustomSection extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.CustomHasCustomSection = CustomHasCustomSection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomHasCustomSection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CustomHasCustomSection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], CustomHasCustomSection.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], CustomHasCustomSection.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RegionHasCustom_1.RegionHasCustom, (RegionHasCustom) => RegionHasCustom.customHasCustomSection_id),
    (0, typeorm_1.JoinColumn)({ name: "regionHasCustom_id" }),
    __metadata("design:type", RegionHasCustom_1.RegionHasCustom)
], CustomHasCustomSection.prototype, "regionHasCustom_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomSection_1.CustomSection, (customSection) => customSection.customHasCustomSection_id),
    (0, typeorm_1.JoinColumn)({ name: "customSection_id" }),
    __metadata("design:type", CustomSection_1.CustomSection)
], CustomHasCustomSection.prototype, "customSection_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomSectionHasOperation_1.CustomSectionHasOperation, (customSectionHasOperation) => customSectionHasOperation.customHasCustomSection_id, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], CustomHasCustomSection.prototype, "customSectionHasOperation_id", void 0);
exports.CustomHasCustomSection = CustomHasCustomSection = __decorate([
    (0, typeorm_1.Entity)()
], CustomHasCustomSection);
//# sourceMappingURL=CustomHasCustomSection.js.map