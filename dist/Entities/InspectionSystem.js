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
exports.InspectionSystem = void 0;
const typeorm_1 = require("typeorm");
const Events_1 = require("./Events");
let InspectionSystem = class InspectionSystem extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.Manufacturer = "";
        this.ModelName = "";
        this.SerialNumber = "";
        this.Identifier = "";
        this.Latitude = "";
        this.Longitude = "";
        this.Country = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.InspectionSystem = InspectionSystem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InspectionSystem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "Manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "ModelName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "SerialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "Identifier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "Latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "Longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InspectionSystem.prototype, "Country", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InspectionSystem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], InspectionSystem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], InspectionSystem.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Events_1.Events, (events) => events.inspectionSystem, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], InspectionSystem.prototype, "events", void 0);
exports.InspectionSystem = InspectionSystem = __decorate([
    (0, typeorm_1.Entity)()
], InspectionSystem);
//# sourceMappingURL=InspectionSystem.js.map