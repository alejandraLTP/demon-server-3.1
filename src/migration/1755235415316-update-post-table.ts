import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1755235415316 implements MigrationInterface {
    name = 'UpdatePostTable1755235415316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placas" DROP COLUMN "placaEdit"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "analistId" integer array`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_inicio"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_inicio" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_final"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_final" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "dateInspection"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "dateInspection" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84"`);
        await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84"`);
        await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "dateInspection"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "dateInspection" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_final"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_final" text`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "vigencia_inicio"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "vigencia_inicio" text`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "analistId"`);
        await queryRunner.query(`ALTER TABLE "placas" ADD "placaEdit" boolean`);
    }

}
