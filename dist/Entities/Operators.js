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
exports.Operators = void 0;
const typeorm_1 = require("typeorm");
const AnalysisEvent_1 = require("./AnalysisEvent");
const TargetEvents_1 = require("./TargetEvents");
let Operators = class Operators extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.FirstName = "";
        this.LastName = "";
        this.LoginName = "";
        this.Role = "";
        this.Company = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Operators = Operators;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Operators.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Operators.prototype, "FirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Operators.prototype, "LastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Operators.prototype, "LoginName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Operators.prototype, "Role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Operators.prototype, "Company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Operators.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Operators.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Operators.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TargetEvents_1.TargetEvents, (targetEvents) => targetEvents.operators, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", TargetEvents_1.TargetEvents)
], Operators.prototype, "targetEvents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AnalysisEvent_1.AnalysisEvent, (analysisEvent) => analysisEvent.operators, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", AnalysisEvent_1.AnalysisEvent)
], Operators.prototype, "analysisEvent", void 0);
exports.Operators = Operators = __decorate([
    (0, typeorm_1.Entity)()
], Operators);
//# sourceMappingURL=Operators.js.map