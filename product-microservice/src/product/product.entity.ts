import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryColumn()
    productId: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
}
