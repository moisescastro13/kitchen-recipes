import {MigrationInterface, QueryRunner} from "typeorm";

export class oneToManyRecipe1631647817713 implements MigrationInterface {
    name = 'oneToManyRecipe1631647817713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipe" DROP CONSTRAINT "FK_385770dfbf5b275c495dd298546"`);
        await queryRunner.query(`ALTER TABLE "public"."recipe" DROP CONSTRAINT "REL_385770dfbf5b275c495dd29854"`);
        await queryRunner.query(`ALTER TABLE "public"."recipe" ADD CONSTRAINT "FK_385770dfbf5b275c495dd298546" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipe" DROP CONSTRAINT "FK_385770dfbf5b275c495dd298546"`);
        await queryRunner.query(`ALTER TABLE "public"."recipe" ADD CONSTRAINT "REL_385770dfbf5b275c495dd29854" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "public"."recipe" ADD CONSTRAINT "FK_385770dfbf5b275c495dd298546" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
