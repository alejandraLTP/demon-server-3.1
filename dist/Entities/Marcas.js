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
exports.Marcas = void 0;
const typeorm_1 = require("typeorm");
const Submarcas_1 = require("./Submarcas");
let Marcas = class Marcas {
    constructor() {
        this.id = 0;
        this.name = "";
    }
};
exports.Marcas = Marcas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Marcas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Marcas.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Submarcas_1.Submarcas, (submarcas) => submarcas.marca_id),
    __metadata("design:type", Array)
], Marcas.prototype, "submarcas", void 0);
exports.Marcas = Marcas = __decorate([
    (0, typeorm_1.Entity)()
], Marcas);
//# sourceMappingURL=Marcas.js.map