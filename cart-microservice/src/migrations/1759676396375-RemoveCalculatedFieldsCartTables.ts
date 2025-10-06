import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCalculatedFieldsCartTables1759676396375
  implements MigrationInterface
{
  name = 'RemoveCalculatedFieldsCartTables1759676396375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "totalPrice"`);
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "totalQuantity"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "totalQuantity" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "totalPrice" double precision NOT NULL`,
    );
  }
}
