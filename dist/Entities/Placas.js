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
exports.Placas = void 0;
const typeorm_1 = require("typeorm");
const Estados_1 = require("./Estados");
const PlacaHasEvents_1 = require("./PlacaHasEvents");
const Vehicles_1 = require("./Vehicles");
let Placas = class Placas {
    constructor() {
        this.id = 0;
        this.placa_f = null;
        this.placa_t = null;
    }
};
exports.Placas = Placas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Placas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Placas.prototype, "placa_f", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Placas.prototype, "placa_t", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Vehicles_1.Vehicles, (vehicles) => vehicles.perfil),
    __metadata("design:type", Array)
], Placas.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estados_1.Estados, (estados) => estados.placas),
    (0, typeorm_1.JoinColumn)({ name: "estado_id" }),
    __metadata("design:type", Estados_1.Estados)
], Placas.prototype, "estado_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlacaHasEvents_1.PlacasHasEvents, (placaHasEvents) => placaHasEvents.placas),
    __metadata("design:type", Array)
], Placas.prototype, "placaHasEvents", void 0);
exports.Placas = Placas = __decorate([
    (0, typeorm_1.Entity)()
], Placas);
//# sourceMappingURL=Placas.js.map