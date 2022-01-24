import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigrations1643015061106 implements MigrationInterface {
    name = 'UserMigrations1643015061106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_cb57cf228ca018ab52e4458236f"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "PK_53d1dc88621ba494dc205f581a4"`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "PK_b59b16ab8334d41fd71dd9c9656" PRIMARY KEY ("mediaId")`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "postPostId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "postPostId" uuid`);
        await queryRunner.query(`ALTER TABLE "media" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "PK_b59b16ab8334d41fd71dd9c9656"`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "PK_53d1dc88621ba494dc205f581a4" PRIMARY KEY ("mediaId", "id")`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_cb57cf228ca018ab52e4458236f" FOREIGN KEY ("postPostId") REFERENCES "post"("postId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
