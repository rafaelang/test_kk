import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPksCartTables1759675517087 implements MigrationInterface {
    name = 'AlterPksCartTables1759675517087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_1225baa79331824f49593f44f4c"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "PK_e4f6c652de6aecc99362aa0f302"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "shoppingCartId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "shoppingCartId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "PK_e4f6c652de6aecc99362aa0f302" PRIMARY KEY ("shoppingCartId")`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "cartShoppingCartId"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "cartShoppingCartId" integer`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_1225baa79331824f49593f44f4c" FOREIGN KEY ("cartShoppingCartId") REFERENCES "cart"("shoppingCartId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_1225baa79331824f49593f44f4c"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "cartShoppingCartId"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "cartShoppingCartId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "PK_e4f6c652de6aecc99362aa0f302"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "shoppingCartId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "shoppingCartId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "PK_e4f6c652de6aecc99362aa0f302" PRIMARY KEY ("shoppingCartId")`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_1225baa79331824f49593f44f4c" FOREIGN KEY ("cartShoppingCartId") REFERENCES "cart"("shoppingCartId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
