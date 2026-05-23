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
exports.OutputFiles = void 0;
const typeorm_1 = require("typeorm");
const AnalysisEvent_1 = require("./AnalysisEvent");
const ScanEvents_1 = require("./ScanEvents");
const TargetEvents_1 = require("./TargetEvents");
const ImageEdits_1 = require("./ImageEdits");
let OutputFiles = class OutputFiles extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.Type = "";
        this.View = "";
        this.Hash = "";
        this.URI = "";
        this.Name = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.OutputFiles = OutputFiles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OutputFiles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], OutputFiles.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], OutputFiles.prototype, "View", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], OutputFiles.prototype, "Hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], OutputFiles.prototype, "URI", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], OutputFiles.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OutputFiles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], OutputFiles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], OutputFiles.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AnalysisEvent_1.AnalysisEvent, (analysisEvent) => analysisEvent.outputFiles, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", AnalysisEvent_1.AnalysisEvent)
], OutputFiles.prototype, "analysisEvent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TargetEvents_1.TargetEvents, (targetEvents) => targetEvents.outputFiles, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", TargetEvents_1.TargetEvents)
], OutputFiles.prototype, "targetEvents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ScanEvents_1.ScanEvents, (scanEvents) => scanEvents.outputFiles, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "scanEvents_id" }),
    __metadata("design:type", ScanEvents_1.ScanEvents)
], OutputFiles.prototype, "scanEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImageEdits_1.ImageEdits, (imageEdits) => imageEdits.outputFiles),
    __metadata("design:type", Array)
], OutputFiles.prototype, "imageEdits", void 0);
exports.OutputFiles = OutputFiles = __decorate([
    (0, typeorm_1.Entity)()
], OutputFiles);
//# sourceMappingURL=OutputFiles.js.map