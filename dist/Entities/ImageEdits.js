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
exports.ImageEdits = void 0;
const typeorm_1 = require("typeorm");
const OutputFiles_1 = require("./OutputFiles");
const XRayFile_1 = require("./XRayFile");
let ImageEdits = class ImageEdits {
    constructor() {
        this.id = 0;
        this.Drawing = "";
        this.Comment = "";
        this.Brightness = "";
        this.Contrast = "";
        this.Saturation = "";
        this.Invert = "";
        this.Sepia = "";
        this.HueRotate = "";
        this.specialFilter = "";
    }
};
exports.ImageEdits = ImageEdits;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImageEdits.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Drawing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Brightness", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Contrast", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Saturation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Invert", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "Sepia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "HueRotate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ImageEdits.prototype, "specialFilter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OutputFiles_1.OutputFiles, (outputFiles) => outputFiles.imageEdits),
    (0, typeorm_1.JoinColumn)({ name: "outputFiles_id" }),
    __metadata("design:type", OutputFiles_1.OutputFiles)
], ImageEdits.prototype, "outputFiles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => XRayFile_1.XRayFile, (xRayFile) => xRayFile.imageEdits),
    (0, typeorm_1.JoinColumn)({ name: "xRayFile_id" }),
    __metadata("design:type", XRayFile_1.XRayFile)
], ImageEdits.prototype, "xRayFile", void 0);
exports.ImageEdits = ImageEdits = __decorate([
    (0, typeorm_1.Entity)()
], ImageEdits);
//# sourceMappingURL=ImageEdits.js.map