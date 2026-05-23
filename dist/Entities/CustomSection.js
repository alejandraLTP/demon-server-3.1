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
exports.CustomSection = void 0;
const typeorm_1 = require("typeorm");
const CustomHasCustomSection_1 = require("./CustomHasCustomSection");
let CustomSection = class CustomSection extends typeorm_1.BaseEntity {
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
exports.CustomSection = CustomSection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomSection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], CustomSection.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], CustomSection.prototype, "clave", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CustomSection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], CustomSection.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], CustomSection.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomHasCustomSection_1.CustomHasCustomSection, (customHasCustomSection) => customHasCustomSection.customSection_id),
    __metadata("design:type", Array)
], CustomSection.prototype, "customHasCustomSection_id", void 0);
exports.CustomSection = CustomSection = __decorate([
    (0, typeorm_1.Entity)()
], CustomSection);
//# sourceMappingURL=CustomSection.js.map