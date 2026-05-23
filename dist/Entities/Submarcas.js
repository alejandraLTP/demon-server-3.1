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
exports.Submarcas = void 0;
const typeorm_1 = require("typeorm");
const Marcas_1 = require("./Marcas");
let Submarcas = class Submarcas extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.name = "";
    }
};
exports.Submarcas = Submarcas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Submarcas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Submarcas.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Marcas_1.Marcas, (marcas) => marcas.submarcas),
    (0, typeorm_1.JoinColumn)({ name: "marca_id" }),
    __metadata("design:type", Marcas_1.Marcas)
], Submarcas.prototype, "marca_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Marcas_1.Marcas, (marcas) => marcas.submarcas),
    __metadata("design:type", Array)
], Submarcas.prototype, "vehicles", void 0);
exports.Submarcas = Submarcas = __decorate([
    (0, typeorm_1.Entity)()
], Submarcas);
//# sourceMappingURL=Submarcas.js.map