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
exports.XRayFile = void 0;
const typeorm_1 = require("typeorm");
const ScanEvents_1 = require("./ScanEvents");
const ImageEdits_1 = require("./ImageEdits");
let XRayFile = class XRayFile extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.uri = "";
        this.type = "";
        this.view = "";
        this.energy = "";
        this.modality = "";
        this.hemdInfo = "";
        // @ManyToOne(() => ScanEvents, (scanEvents) => scanEvents.xRayFile, {
        //   onDelete: "CASCADE",
        // })
        // scanEvents?: ScanEvents;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.XRayFile = XRayFile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], XRayFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], XRayFile.prototype, "uri", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], XRayFile.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], XRayFile.prototype, "view", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], XRayFile.prototype, "energy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], XRayFile.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], XRayFile.prototype, "hemdInfo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], XRayFile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], XRayFile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], XRayFile.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ScanEvents_1.ScanEvents, (scanEvents) => scanEvents.xRayFile, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", ScanEvents_1.ScanEvents)
], XRayFile.prototype, "scanEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ImageEdits_1.ImageEdits, (imageEdits) => imageEdits.xRayFile, {}),
    __metadata("design:type", Array)
], XRayFile.prototype, "imageEdits", void 0);
exports.XRayFile = XRayFile = __decorate([
    (0, typeorm_1.Entity)()
], XRayFile);
//# sourceMappingURL=XRayFile.js.map