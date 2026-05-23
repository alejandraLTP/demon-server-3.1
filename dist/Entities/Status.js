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
exports.Status = void 0;
const typeorm_1 = require("typeorm");
const PlacaHasEvents_1 = require("./PlacaHasEvents");
const Events_1 = require("./Events");
let Status = class Status extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.name = "";
        this.createdAt = new Date();
        this.updatedAt = null;
    }
};
exports.Status = Status;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Status.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Status.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Status.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], Status.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlacaHasEvents_1.PlacasHasEvents, (placaHasEvents) => placaHasEvents.status, {}),
    __metadata("design:type", Array)
], Status.prototype, "placaHasEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Events_1.Events, (events) => events.status),
    __metadata("design:type", Array)
], Status.prototype, "events", void 0);
exports.Status = Status = __decorate([
    (0, typeorm_1.Entity)()
], Status);
//# sourceMappingURL=Status.js.map