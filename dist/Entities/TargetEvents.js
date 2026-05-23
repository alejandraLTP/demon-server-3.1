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
exports.TargetEvents = void 0;
const typeorm_1 = require("typeorm");
const Events_1 = require("./Events");
const Operators_1 = require("./Operators");
const OutputFiles_1 = require("./OutputFiles");
const Vehicles_1 = require("./Vehicles");
let TargetEvents = class TargetEvents {
    constructor() {
        this.id = 0;
        this.comment = "";
        this.timeStamp = null;
        this.createdAt = new Date();
        this.digSign = "";
        this.updatedAt = null;
        this.deletedAt = null;
    }
};
exports.TargetEvents = TargetEvents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TargetEvents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], TargetEvents.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], TargetEvents.prototype, "timeStamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TargetEvents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], TargetEvents.prototype, "digSign", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TargetEvents.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TargetEvents.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Operators_1.Operators, (operators) => operators.targetEvents, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], TargetEvents.prototype, "operators", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vehicles_1.Vehicles, (vehicles) => vehicles.targetEvents, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Vehicles_1.Vehicles)
], TargetEvents.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Events_1.Events, (events) => events.targetEvents, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Events_1.Events)
], TargetEvents.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OutputFiles_1.OutputFiles, (outputFiles) => outputFiles.targetEvents, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", OutputFiles_1.OutputFiles)
], TargetEvents.prototype, "outputFiles", void 0);
exports.TargetEvents = TargetEvents = __decorate([
    (0, typeorm_1.Entity)()
], TargetEvents);
//# sourceMappingURL=TargetEvents.js.map