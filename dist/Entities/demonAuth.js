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
exports.DemonAuth = void 0;
const typeorm_1 = require("typeorm");
const Sitios_1 = require("./Sitios");
let DemonAuth = class DemonAuth extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = "";
        this.username = "";
        this.password = "";
        this.tempPassword = "";
        this.passwordVisible = "";
        this.salt = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
exports.DemonAuth = DemonAuth;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], DemonAuth.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], DemonAuth.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], DemonAuth.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], DemonAuth.prototype, "tempPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], DemonAuth.prototype, "passwordVisible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], DemonAuth.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DemonAuth.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DemonAuth.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], DemonAuth.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.OneToOne)(() => Sitios_1.Sitios, (sitio) => sitio.demonAuth),
    (0, typeorm_1.JoinColumn)({ name: "sitio_id" }),
    __metadata("design:type", Sitios_1.Sitios)
], DemonAuth.prototype, "sitio", void 0);
exports.DemonAuth = DemonAuth = __decorate([
    (0, typeorm_1.Entity)()
], DemonAuth);
//# sourceMappingURL=demonAuth.js.map