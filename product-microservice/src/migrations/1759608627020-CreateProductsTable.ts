import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1759608627020 implements MigrationInterface {
    name = 'CreateProductsTable1759608627020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("productId" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
