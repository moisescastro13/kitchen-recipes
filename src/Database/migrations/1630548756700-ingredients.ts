import {MigrationInterface, QueryRunner} from "typeorm";

export class ingredients1630548756700 implements MigrationInterface {
    name = 'ingredients1630548756700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" character varying(100), "Status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50), "lastName" character varying(50), "Status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "Status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "detail_id" integer NOT NULL, CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_details" ("id" SERIAL NOT NULL, "preparation" text NOT NULL, "description" character varying(100), "Status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a3b10a3f9860b528c53db0d0cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "urlImage" text, "Status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer NOT NULL, "user_id" integer NOT NULL, "details_id" integer NOT NULL, CONSTRAINT "REL_c1b4e81bf69aa6e8f3a14c4c2f" UNIQUE ("category_id"), CONSTRAINT "REL_385770dfbf5b275c495dd29854" UNIQUE ("user_id"), CONSTRAINT "REL_5a3b10a3f9860b528c53db0d0c" UNIQUE ("details_id"), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "description" text, "Status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_317acbdff49aeb8558a1bc6c60" UNIQUE ("user_id"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients_recipes" ("recipeId" integer NOT NULL, "ingredientsId" integer NOT NULL, CONSTRAINT "PK_899aa35ff7394c454f72d970031" PRIMARY KEY ("recipeId", "ingredientsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_738dc9037c4b46cd604be9ca7b" ON "ingredients_recipes" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e130cc5b67a9d0574a857292f" ON "ingredients_recipes" ("ingredientsId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_c1b4e81bf69aa6e8f3a14c4c2f6" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_385770dfbf5b275c495dd298546" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_5a3b10a3f9860b528c53db0d0cb" FOREIGN KEY ("details_id") REFERENCES "recipe_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients_recipes" ADD CONSTRAINT "FK_738dc9037c4b46cd604be9ca7b7" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ingredients_recipes" ADD CONSTRAINT "FK_4e130cc5b67a9d0574a857292f6" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients_recipes" DROP CONSTRAINT "FK_4e130cc5b67a9d0574a857292f6"`);
        await queryRunner.query(`ALTER TABLE "ingredients_recipes" DROP CONSTRAINT "FK_738dc9037c4b46cd604be9ca7b7"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_5a3b10a3f9860b528c53db0d0cb"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_385770dfbf5b275c495dd298546"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_c1b4e81bf69aa6e8f3a14c4c2f6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`DROP INDEX "IDX_4e130cc5b67a9d0574a857292f"`);
        await queryRunner.query(`DROP INDEX "IDX_738dc9037c4b46cd604be9ca7b"`);
        await queryRunner.query(`DROP TABLE "ingredients_recipes"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "recipe_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
