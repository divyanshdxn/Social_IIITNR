import { MigrationInterface, QueryRunner } from 'typeorm';

export class pages1643050289341 implements MigrationInterface {
  name = 'pages1643050289341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media" ("mediaId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "mimeType" character varying, "fileName" character varying NOT NULL, "originalName" character varying, "path" character varying NOT NULL, CONSTRAINT "UQ_6c20192587395331c5bfd3063e0" UNIQUE ("path"), CONSTRAINT "PK_b59b16ab8334d41fd71dd9c9656" PRIMARY KEY ("mediaId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("passwordHash" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL, "profileUserId" uuid, CONSTRAINT "REL_7da77968af7f79a98e4b28bb9d" UNIQUE ("profileUserId"), CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email"))`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "mimeType"`);
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "postId" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "post_postId_seq"`);
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "media"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "media" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7da77968af7f79a98e4b28bb9d4" FOREIGN KEY ("profileUserId") REFERENCES "profile"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7da77968af7f79a98e4b28bb9d4"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "media"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "media" bytea`);
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "updatedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "createdAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "post_postId_seq" OWNED BY "post"."postId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "postId" SET DEFAULT nextval('"post_postId_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD "mimeType" character varying`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "pages"`);
    await queryRunner.query(`DROP TABLE "media"`);
  }
}
