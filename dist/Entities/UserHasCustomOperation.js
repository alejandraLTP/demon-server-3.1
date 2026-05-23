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
exports.UserHasCustomOperation = void 0;
const typeorm_1 = require("typeorm");
const CustomSectionHasOperation_1 = require("./CustomSectionHasOperation");
const User_1 = require("./User");
const Equipos_1 = require("./Equipos");
let UserHasCustomOperation = class UserHasCustomOperation extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.UserHasCustomOperation = UserHasCustomOperation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserHasCustomOperation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserHasCustomOperation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], UserHasCustomOperation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], UserHasCustomOperation.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {}),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], UserHasCustomOperation.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomSectionHasOperation_1.CustomSectionHasOperation, (customSectionHasOperation) => customSectionHasOperation.userHasCustomOperation_id),
    (0, typeorm_1.JoinColumn)({ name: "customSectionHasOperation_id" }),
    __metadata("design:type", CustomSectionHasOperation_1.CustomSectionHasOperation)
], UserHasCustomOperation.prototype, "customSectionHasOperation_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Equipos_1.Equipos, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "equipos_id" }),
    __metadata("design:type", Equipos_1.Equipos)
], UserHasCustomOperation.prototype, "equipos_id", void 0);
exports.UserHasCustomOperation = UserHasCustomOperation = __decorate([
    (0, typeorm_1.Entity)()
], UserHasCustomOperation);
//# sourceMappingURL=UserHasCustomOperation.js.map