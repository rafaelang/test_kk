import { Inject, Injectable, Logger } from '@nestjs/common';
import { CartDao, CartProductDao } from './daos/cart.dao';
import { CartDto, ProductOperationDto } from './dtos/cart.dto';
import { ProductDto } from './dtos/product.dto';
import { CartProduct } from './cart.entity';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly cartRepository: CartDao,
    private readonly cartProductRepository: CartProductDao,
    @Inject('PRODUCT_HTTP_CLIENT')
    private readonly productService: any,
  ) {}

  async getProduct(productId: number): Promise<ProductDto> {
    try {
      const response = await this.productService.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to get product with ID ${productId}`,
        error.stack,
      );
      throw error;
    }
  }

  async getCartById(shoppingCartId: number) {
    const cart = await this.cartRepository.get(shoppingCartId);
    return cart;
  }

  async getCartByUserId(userId: number): Promise<CartDto> {
    let cart = await this.cartRepository.getOrCreateByUserId(userId);
    if (!cart.products) {
      cart.products = [];
    }
    const calculatedTotal = cart.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
    const totalQuantity = cart.products.reduce(
      (sum, product) => sum + product.quantity,
      0,
    );
    const cartDto = {
      ...cart,
      totalPrice: calculatedTotal,
      totalQuantity: totalQuantity,
    };
    return cartDto;
  }

  async getCartProduct(
    userId: number,
    shoppingCartId: number,
    productId: number,
  ): Promise<CartProduct | null> {
    const cartProduct = await this.cartProductRepository.get(
      userId,
      shoppingCartId,
      productId,
    );
    return cartProduct;
  }

  async addItemToCart(
    userId: number,
    shoppingCartId: number,
    item: ProductOperationDto,
  ) {
    const product = await this.getProduct(item.productId);
    item.price = product.price;
    const cartProduct = await this.cartProductRepository.updateOrCreate(
      userId,
      shoppingCartId,
      item.productId,
      item,
      (target, source) => {
        target.quantity += source.quantity;
      },
    );
    return { shoppingCartId, itemAdded: cartProduct };
  }

  async removeItemFromCart(
    userId: number,
    shoppingCartId: number,
    item: ProductOperationDto,
  ) {
    const cartProduct = await this.getCartProduct(
      userId,
      shoppingCartId,
      item.productId,
    );
    let new_quantity = 0;

    if (!cartProduct) {
      const error = new Error(
        `Product ${item.productId} does not exist in cart ${shoppingCartId} or cart not found.`,
      );
      error.name = 'InvalidShoppingCartIdError';
      throw error;
    }
    if (cartProduct.quantity <= item.quantity) {
      this.cartProductRepository.delete(cartProduct);
    }
    if (cartProduct.quantity > item.quantity) {
      cartProduct.quantity -= item.quantity;
      new_quantity = cartProduct.quantity;
      await this.cartProductRepository.save(cartProduct);
    }

    return {
      shoppingCartId,
      itemRemoved: item.productId,
      currentQuantity: new_quantity,
    };
  }

  async validateCartOwnership(userId: number, shoppingCartId: number) {
    const cart = await this.getCartById(shoppingCartId);
    if (!cart || cart.userId !== userId) {
      this.logger.warn(
        `UserId ${userId} attempted to access ShoppingCartId ${shoppingCartId} which they do not own.`,
      );
      const error = new Error(
        `ShoppingCartId ${shoppingCartId} does not belong to UserId ${userId} or cart not found.`,
      );
      error.name = 'InvalidShoppingCartIdError';
      throw error;
    }
    return true;
  }

  async updateCart(
    userId: number,
    shoppingCartId: number,
    item: ProductOperationDto,
  ) {
    await this.validateCartOwnership(userId, shoppingCartId);

    if (item.operation === 'REMOVE') {
      return this.removeItemFromCart(userId, shoppingCartId, item);
    } else if (item.operation === 'ADD') {
      return this.addItemToCart(userId, shoppingCartId, item);
    }

    this.logger.log(`Updating cart ${shoppingCartId} with item`, item);
    return { shoppingCartId, itemUpdated: item };
  }
}
