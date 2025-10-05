import { ASTAndDefiniteProgram } from './../../node_modules/@typescript-eslint/typescript-estree/dist/create-program/shared.d';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartOperationDto, CartOperationType, CartRequestOperationDto } from './dtos/cart-operation.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        try {
            return await this.cartService.getCartByUserId(userId);
        } catch (error) {
            if (error.isAxiosError) {
                throw new Error(`Axios error: ${error.message}`);
            }
            throw error;
        }
    }

    @Post(':cartId/add-item')
    @ApiBody({ type: CartRequestOperationDto })
    async addItem(@Param('cartId') cartId: string, @Body() item: CartRequestOperationDto) {
        const payload: CartOperationDto = { operation: CartOperationType.ADD, productId: item.productId, quantity: item.quantity };
        return await this.cartService.addItem(cartId, payload);
    }
}
