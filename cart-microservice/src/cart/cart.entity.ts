import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    shoppingCartId: string;

    @Column({ type: 'varchar', length: 50 })
    userId: string;

    @Column({ type: 'float' })
    totalPrice: number;

    @Column({ type: 'int' })
    totalQuantity: number;

    @OneToMany(() => CartProduct, product => product.cart, { cascade: true, eager: true })
    products: CartProduct[];
}

@Entity('cart_product')
export class CartProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    productId: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'uuid' })
    cartId: string;

    @ManyToOne(() => Cart, cart => cart.products)
    cart: Cart;
}