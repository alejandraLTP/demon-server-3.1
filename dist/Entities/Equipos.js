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
exports.Equipos = void 0;
const typeorm_1 = require("typeorm");
const EquiposHasSitios_1 = require("./EquiposHasSitios");
let Equipos = class Equipos extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.clave = "";
        this.name = "";
    }
};
exports.Equipos = Equipos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Equipos.prototype, "clave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Equipos.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EquiposHasSitios_1.EquiposHasSitios, (equiposHasSitios) => equiposHasSitios.equipos_id),
    __metadata("design:type", Array)
], Equipos.prototype, "equiposHasSitios_id", void 0);
exports.Equipos = Equipos = __decorate([
    (0, typeorm_1.Entity)()
], Equipos);
//# sourceMappingURL=Equipos.js.map