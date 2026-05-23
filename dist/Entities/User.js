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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Audits_1 = require("./Audits");
const EventHistory_1 = require("./EventHistory");
const Horarios_1 = require("./Horarios");
const Roles_1 = require("./Roles");
const UserHasCustomOperation_1 = require("./UserHasCustomOperation");
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.username = "";
        this.num_empleado = "";
        this.password = "";
        this.fullname = "";
        this.email = "";
        this.statusPass = false;
        this.statusLogin = false;
        this.fecha_inicio = null;
        this.fecha_fin = null;
        this.isActive = true;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "num_empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "statusPass", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "statusLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "fecha_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "fecha_fin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, (roles) => roles.users, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", Roles_1.Roles)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Horarios_1.Horarios, (horarios) => horarios.user, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "horarios" }),
    __metadata("design:type", Horarios_1.Horarios)
], User.prototype, "horarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventHistory_1.EventHistory, (eventHistory) => eventHistory.user, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "eventHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Audits_1.Audits, (audits) => audits.users_id, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "audits_id" }),
    __metadata("design:type", Array)
], User.prototype, "audits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserHasCustomOperation_1.UserHasCustomOperation, (userHasCustomOperation) => userHasCustomOperation.user_id, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "userHasCustomOperation_id" }),
    __metadata("design:type", Array)
], User.prototype, "userHasCustomOperation_id", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=User.js.map