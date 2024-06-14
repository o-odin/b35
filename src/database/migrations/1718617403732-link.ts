import { MigrationInterface, QueryRunner } from 'typeorm';

export class Link1718617403732 implements MigrationInterface {
  name = 'Link1718617403732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "link"
             (
                 "id"   SERIAL NOT NULL,
                 "hash" bytea  NOT NULL,
                 "text" text   NOT NULL,
                 CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id")
             )`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7ec9ae0a307e7bcb62c85e752d" ON "link" ("hash")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7ec9ae0a307e7bcb62c85e752d"`,
    );
    await queryRunner.query(`DROP TABLE "link"`);
  }
}
