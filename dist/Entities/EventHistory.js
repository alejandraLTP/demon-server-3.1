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
exports.EventHistory = void 0;
const typeorm_1 = require("typeorm");
const Events_1 = require("./Events");
const User_1 = require("./User");
let EventHistory = class EventHistory extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.dateTimeInit = new Date();
        this.dateTimeEnd = new Date();
        this.status = false;
    }
};
exports.EventHistory = EventHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], EventHistory.prototype, "dateTimeInit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], EventHistory.prototype, "dateTimeEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], EventHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Events_1.Events, (events) => events.eventHistory, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "event_id" }),
    __metadata("design:type", Events_1.Events)
], EventHistory.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.eventHistory, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], EventHistory.prototype, "user", void 0);
exports.EventHistory = EventHistory = __decorate([
    (0, typeorm_1.Entity)()
], EventHistory);
//# sourceMappingURL=EventHistory.js.map