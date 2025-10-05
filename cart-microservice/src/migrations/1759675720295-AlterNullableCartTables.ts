import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNullableCartTables1759675720295 implements MigrationInterface {
    name = 'AlterNullableCartTables1759675720295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "cartId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "cartId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "productId" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" character varying(50) NOT NULL`);
    }

}
