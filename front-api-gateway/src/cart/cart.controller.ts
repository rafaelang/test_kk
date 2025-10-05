import { ASTAndDefiniteProgram } from './../../node_modules/@typescript-eslint/typescript-estree/dist/create-program/shared.d';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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

    @Post(':cartId/add-item')
    async addItem(@Param('cartId') cartId: string, @Body() item: { productId: string; quantity: number }) {
        return await this.cartService.addItem(cartId, item);
    }
}
