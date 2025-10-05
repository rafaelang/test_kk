import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartTables1759617765573 implements MigrationInterface {
    name = 'CreateCartTables1759617765573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("shoppingCartId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying(50) NOT NULL, "totalPrice" double precision NOT NULL, "totalQuantity" integer NOT NULL, CONSTRAINT "PK_e4f6c652de6aecc99362aa0f302" PRIMARY KEY ("shoppingCartId"))`);
        await queryRunner.query(`CREATE TABLE "cart_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" character varying(50) NOT NULL, "price" double precision NOT NULL, "quantity" integer NOT NULL, "cartId" uuid NOT NULL, "cartShoppingCartId" uuid, CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_1225baa79331824f49593f44f4c" FOREIGN KEY ("cartShoppingCartId") REFERENCES "cart"("shoppingCartId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_1225baa79331824f49593f44f4c"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
