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
exports.Audits = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const enums_1 = require("../config/constants/enums");
let Audits = class Audits extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.tableName = "";
        this.recordId = 0;
        this.operation = "";
        this.timestamp = new Date();
    }
};
exports.Audits = Audits;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Audits.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Entities, default: enums_1.Entities.users }),
    __metadata("design:type", String)
], Audits.prototype, "tableName", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Audits.prototype, "recordId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.OperationAudits, default: enums_1.OperationAudits.create, nullable: false }),
    __metadata("design:type", String)
], Audits.prototype, "operation", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Audits.prototype, "changedData", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.audits),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Audits.prototype, "users_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Audits.prototype, "timestamp", void 0);
exports.Audits = Audits = __decorate([
    (0, typeorm_1.Entity)()
], Audits);
//# sourceMappingURL=Audits.js.map