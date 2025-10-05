import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    shoppingCartId: number;

    @Column({ type: 'int', nullable: true })
    userId: number;

    @OneToMany(() => CartProduct, product => product.cart, { cascade: true, eager: true })
    products: CartProduct[];
}

@Entity('cart_product')
export class CartProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    productId: number;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.products)
    cart: Cart;
}