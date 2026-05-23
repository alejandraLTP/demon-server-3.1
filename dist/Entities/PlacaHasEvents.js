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
exports.PlacasHasEvents = void 0;
const typeorm_1 = require("typeorm");
const BlackList_1 = require("./BlackList");
const Events_1 = require("./Events");
const Placas_1 = require("./Placas");
const Status_1 = require("./Status");
let PlacasHasEvents = class PlacasHasEvents {
    constructor() {
        this.id = 0;
    }
};
exports.PlacasHasEvents = PlacasHasEvents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlacasHasEvents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Placas_1.Placas, (placas) => placas.placaHasEvents),
    (0, typeorm_1.JoinColumn)({ name: "placas_id" }),
    __metadata("design:type", Object)
], PlacasHasEvents.prototype, "placas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Events_1.Events, (events) => events.placaHasEvents, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "events_id" }),
    __metadata("design:type", Events_1.Events)
], PlacasHasEvents.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BlackList_1.BlackList, (blackList) => blackList.placaHasEvents, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "blackList_id" }),
    __metadata("design:type", BlackList_1.BlackList)
], PlacasHasEvents.prototype, "blackList", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Status_1.Status, (status) => status.placaHasEvents),
    (0, typeorm_1.JoinColumn)({ name: "status_id" }),
    __metadata("design:type", Status_1.Status)
], PlacasHasEvents.prototype, "status", void 0);
exports.PlacasHasEvents = PlacasHasEvents = __decorate([
    (0, typeorm_1.Entity)()
], PlacasHasEvents);
//# sourceMappingURL=PlacaHasEvents.js.map