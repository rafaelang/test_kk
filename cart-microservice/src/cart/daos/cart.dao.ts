import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart, CartProduct } from "../cart.entity";
import { Repository, QueryFailedError } from "typeorm";
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

        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) {}

    async get(userId: number, shoppingCartId: number, productId: number): Promise<CartProduct | null> {
        let cart_product = await this.repository.findOneBy({ productId: productId, cart: { shoppingCartId: shoppingCartId, userId: userId } });
        return cart_product;
    }

    async delete(cartProduct: CartProduct): Promise<void> {
        await this.repository.remove(cartProduct);
    }

    async save(cartProduct: CartProduct): Promise<CartProduct> {
        try {
            return await this.repository.save(cartProduct);
        } catch (error) {
            if (!(error instanceof QueryFailedError)) {
                throw error;
            }

            if (
                error.driverError.detail.includes(`Key (cartShoppingCartId)=(${cartProduct.cart.shoppingCartId}) is not present in table`)
            ) {
               const error = new Error(`Invalid shoppingCartId: ${cartProduct.cart.shoppingCartId} does not exist.`);
               error.name = "InvalidShoppingCartIdError";
               throw error;
            }

            throw error;
        }
    }

    async updateOrCreate(
        userId: number,
        cartId: number,
        productId: number,
        item: ProductDto,
        fn_assign: (target: CartProduct, source: ProductDto) => void = Object.assign
    ): Promise<CartProduct> {
        let [created, cart_product] = await this.getOrCreate(userId, cartId, productId, item, false);

        if (!created) {
            fn_assign(cart_product, item);
        }

        cart_product.productId = productId;
        cart_product = await this.save(cart_product);

        return cart_product;
    }

    async getOrCreate(
        userId: number,
        shoppingCartId: number,
        productId: number,
        item: ProductDto,
        persist: boolean = true
    ): Promise<[boolean, CartProduct]> {
        let cart_product = await this.repository.findOneBy({ productId: productId, cart: { userId: userId, shoppingCartId: shoppingCartId } });
        let created = false;

        if (!cart_product) {
            cart_product = this.repository.create({ cart: { shoppingCartId: shoppingCartId }, ...item });
            created = true;
        }

        cart_product.userId = userId;
        cart_product.productId = productId;

        if (persist) {
            cart_product = await this.save(cart_product);
        }

        return [created, cart_product];
    }
}   