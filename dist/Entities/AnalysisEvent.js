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
exports.AnalysisEvent = void 0;
const typeorm_1 = require("typeorm");
const Events_1 = require("./Events");
const Annotations_1 = require("./Annotations");
const Operators_1 = require("./Operators");
const OutputFiles_1 = require("./OutputFiles");
let AnalysisEvent = class AnalysisEvent extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.name = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.AnalysisEvent = AnalysisEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AnalysisEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], AnalysisEvent.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AnalysisEvent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], AnalysisEvent.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], AnalysisEvent.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Operators_1.Operators, (operators) => operators.analysisEvent, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Operators_1.Operators)
], AnalysisEvent.prototype, "operators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Annotations_1.Annotations, (annotations) => annotations.analysisEvent, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Annotations_1.Annotations)
], AnalysisEvent.prototype, "annotations", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Events_1.Events),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Events_1.Events)
], AnalysisEvent.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OutputFiles_1.OutputFiles, (outputFiles) => outputFiles.analysisEvent, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", OutputFiles_1.OutputFiles)
], AnalysisEvent.prototype, "outputFiles", void 0);
exports.AnalysisEvent = AnalysisEvent = __decorate([
    (0, typeorm_1.Entity)()
], AnalysisEvent);
//# sourceMappingURL=AnalysisEvent.js.map