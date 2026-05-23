"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostTable1755235415316 = void 0;
class UpdatePostTable1755235415316 {
    constructor() {
        this.name = 'UpdatePostTable1755235415316';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "placas" DROP COLUMN "placaEdit"`);
            yield queryRunner.query(`ALTER TABLE "events" ADD "analistId" integer array`);
            yield queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_inicio"`);
            yield queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_inicio" TIMESTAMP WITH TIME ZONE`);
            yield queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_final"`);
            yield queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_final" TIMESTAMP WITH TIME ZONE`);
            yield queryRunner.query(`ALTER TABLE "events" DROP COLUMN "dateInspection"`);
            yield queryRunner.query(`ALTER TABLE "events" ADD "dateInspection" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84"`);
            yield queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "scan" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84" PRIMARY KEY ("id")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84"`);
            yield queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "scan" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "events" DROP COLUMN "dateInspection"`);
            yield queryRunner.query(`ALTER TABLE "events" ADD "dateInspection" TIMESTAMP WITH TIME ZONE`);
            yield queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_final"`);
            yield queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_final" text`);
            yield queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_inicio"`);
            yield queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_inicio" text`);
            yield queryRunner.query(`ALTER TABLE "events" DROP COLUMN "analistId"`);
            yield queryRunner.query(`ALTER TABLE "placas" ADD "placaEdit" boolean`);
        });
    }
}
exports.UpdatePostTable1755235415316 = UpdatePostTable1755235415316;
//# sourceMappingURL=1755235415316-update-post-table.js.map