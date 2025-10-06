import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdInCartProduct1759715980597 implements MigrationInterface {
    name = 'AddUserIdInCartProduct1759715980597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "userId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "userId"`);
    }

}
