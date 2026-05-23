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
exports.BlackList = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../config/constants/enums");
const PlacaHasEvents_1 = require("./PlacaHasEvents");
let BlackList = class BlackList extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.folio = "";
        this.vigencia_inicio = new Date();
        this.vigencia_final = new Date();
        this.vencida = false;
        this.cancelada = false;
        this.comment = "";
        this.fuente_info = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }
};
exports.BlackList = BlackList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], BlackList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], BlackList.prototype, "folio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], BlackList.prototype, "vigencia_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], BlackList.prototype, "vigencia_final", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], BlackList.prototype, "vencida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], BlackList.prototype, "cancelada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], BlackList.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.Fuentes,
        nullable: true,
        default: enums_1.Fuentes.DEFINIR,
    }),
    __metadata("design:type", String)
], BlackList.prototype, "fuente_info", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BlackList.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BlackList.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], BlackList.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlacaHasEvents_1.PlacasHasEvents, (placaHasEvents) => placaHasEvents.blackList),
    __metadata("design:type", Array)
], BlackList.prototype, "placaHasEvents", void 0);
exports.BlackList = BlackList = __decorate([
    (0, typeorm_1.Entity)("blacklist")
], BlackList);
//# sourceMappingURL=BlackList.js.map