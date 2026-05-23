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
exports.ScanEvents = void 0;
const typeorm_1 = require("typeorm");
const Events_1 = require("./Events");
const OcrResults_1 = require("./OcrResults");
const OutputFiles_1 = require("./OutputFiles");
const XRayFile_1 = require("./XRayFile");
let ScanEvents = class ScanEvents {
    constructor() {
        this.id = 0;
        this.scannerCaseId = "";
        this.digsign = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.ScanEvents = ScanEvents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ScanEvents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], ScanEvents.prototype, "scannerCaseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], ScanEvents.prototype, "digsign", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ScanEvents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], ScanEvents.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], ScanEvents.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => XRayFile_1.XRayFile, (xRayFile) => xRayFile.scanEvents, {
        onDelete: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], ScanEvents.prototype, "xRayFile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OcrResults_1.OcrResults, (ocrResults) => ocrResults.scanEvents, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "ocrResults_id" }),
    __metadata("design:type", OcrResults_1.OcrResults)
], ScanEvents.prototype, "ocrResults", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OutputFiles_1.OutputFiles, (outputFiles) => outputFiles.scanEvents, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], ScanEvents.prototype, "outputFiles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Events_1.Events, (events) => events.scanEvents, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Events_1.Events)
], ScanEvents.prototype, "events", void 0);
exports.ScanEvents = ScanEvents = __decorate([
    (0, typeorm_1.Entity)()
], ScanEvents);
//# sourceMappingURL=ScanEvents.js.map