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
exports.RegionHasCustom = void 0;
const typeorm_1 = require("typeorm");
const Customs_1 = require("./Customs");
const Regions_1 = require("./Regions");
const CustomHasCustomSection_1 = require("./CustomHasCustomSection");
let RegionHasCustom = class RegionHasCustom extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
    map(arg0) {
        throw new Error("Method not implemented.");
    }
};
exports.RegionHasCustom = RegionHasCustom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegionHasCustom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RegionHasCustom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], RegionHasCustom.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], RegionHasCustom.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Regions_1.Regions, (regions) => regions.regionHasCustom, {}),
    (0, typeorm_1.JoinColumn)({ name: "region_id" }),
    __metadata("design:type", Regions_1.Regions)
], RegionHasCustom.prototype, "region_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customs_1.Customs, (customs) => customs.regionHasCustom),
    (0, typeorm_1.JoinColumn)({ name: "custom_id" }),
    __metadata("design:type", Customs_1.Customs)
], RegionHasCustom.prototype, "custom_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomHasCustomSection_1.CustomHasCustomSection, (customHasCustomSection) => customHasCustomSection.regionHasCustom_id, {}),
    __metadata("design:type", Array)
], RegionHasCustom.prototype, "customHasCustomSection_id", void 0);
exports.RegionHasCustom = RegionHasCustom = __decorate([
    (0, typeorm_1.Entity)()
], RegionHasCustom);
//# sourceMappingURL=RegionHasCustom.js.map