import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @Get(':cartId')
    async getCart(@Param('cartId') cartId: string) {
        //await new Promise(resolve => setTimeout(resolve, 2000));
        return this.cartService.getCartById(cartId);
    }

    @MessagePattern('update_cart')
    async updateCart(data: { cartId: string; item: { productId: string; quantity: number } }) {
        return this.cartService.updateCart(data.cartId, data.item);
    }
}
