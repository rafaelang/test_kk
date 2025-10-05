import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':cartId')
    async getCart(@Param('cartId') cartId: string) {
        try {
            return await this.cartService.getCart(cartId);
        } catch (error) {
            if (error.isAxiosError) {
                throw new Error(`Axios error: ${error.message}`);
            }
            throw error;
        }
    }
}
