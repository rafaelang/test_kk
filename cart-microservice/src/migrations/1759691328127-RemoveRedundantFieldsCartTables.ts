import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRedundantFieldsCartTables1759691328127 implements MigrationInterface {
    name = 'RemoveRedundantFieldsCartTables1759691328127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "cartId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "cartId" integer NOT NULL`);
    }

}
