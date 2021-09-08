import {MigrationInterface, QueryRunner} from "typeorm";

export class recipesFixed1631046718190 implements MigrationInterface {
    name = 'recipesFixed1631046718190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipe" ADD "approved" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipe" DROP COLUMN "approved"`);
    }

}
