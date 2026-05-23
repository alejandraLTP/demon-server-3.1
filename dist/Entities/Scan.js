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
exports.Scan = void 0;
const typeorm_1 = require("typeorm");
const XRayFile_1 = require("./XRayFile");
let Scan = class Scan {
    constructor() {
        // @PrimaryGeneratedColumn("uuid")
        // id: string = "";
        this.id = 0;
        this.EventId = "";
        this.dateScanned = new Date();
        this.hourScanned = "";
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.Scan = Scan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Scan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Scan.prototype, "EventId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Scan.prototype, "dateScanned", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], Scan.prototype, "hourScanned", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { default: [] }),
    __metadata("design:type", Array)
], Scan.prototype, "OCRResult", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { default: [] }),
    __metadata("design:type", Array)
], Scan.prototype, "OutputFile", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Scan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Scan.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Scan.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => XRayFile_1.XRayFile, (xrayFiles) => xrayFiles.scanEvents),
    __metadata("design:type", Scan)
], Scan.prototype, "xrayFiles", void 0);
exports.Scan = Scan = __decorate([
    (0, typeorm_1.Entity)()
], Scan);
//# sourceMappingURL=Scan.js.map