import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart, CartProduct } from "../cart.entity";
import { Repository } from "typeorm";
import { CartDto, ProductDto } from "../dtos/cart.dto";

@Injectable()
export class CartDao {
    constructor(
        @InjectRepository(Cart)
        private readonly repository: Repository<Cart>,
    ) {}

    async get(shoppingCartId: number): Promise<Cart | null> {
        let cart = await this.repository.findOneBy({ shoppingCartId: shoppingCartId });
        return cart;
    }

    async getOrCreateByUserId(userId: number): Promise<Cart> {
        // Todo add active criteria
        let cart = await this.repository.findOne({
            where: { userId: userId },
            relations: ["products"],
        });

        if (!cart) {
            cart = this.repository.create({ userId: userId });
            cart = await this.repository.save(cart);
        }

        return cart;
    }
}

@Injectable()
export class CartProductDao {
    constructor(
        @InjectRepository(CartProduct)
        private readonly repository: Repository<CartProduct>,
    ) {}

    async updateOrCreate(cartId: number, productId: number, item: ProductDto, fn_assign: CallableFunction = Object.assign): Promise<CartProduct> {
        let [created, cart_product] = await this.getOrCreate(cartId, productId, item, false);

        if (!created) {
            fn_assign(cart_product, item);
        }

        cart_product.productId = productId;
        cart_product = await this.repository.save(cart_product);

        return cart_product
    }

    async getOrCreate(
        shoppingCartId: number,
        productId: number,
        item: ProductDto,
        persist: boolean = true
    ): Promise<[boolean, CartProduct]> {
        let cart_product = await this.repository.findOneBy({ productId: productId, cart: { shoppingCartId: shoppingCartId } });
        let created = false;

        if (!cart_product) {
            cart_product = this.repository.create({ cart: { shoppingCartId: shoppingCartId }, ...item });
            created = true;
        }

        cart_product.productId = productId;

        if (persist) {
            cart_product = await this.repository.save(cart_product);
        }

        return [created, cart_product];
    }
}   