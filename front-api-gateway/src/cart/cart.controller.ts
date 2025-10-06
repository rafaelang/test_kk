import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto, CartOperationDto, CartOperationType, CartRequestOperationDto, GetCartIdParamDto, GetCartUserIdParamDto } from './dtos/cart-operation.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':userId')
    @ApiOperation({ summary: 'Get user cart details' })
    @ApiResponse({ status: 200, description: 'User cart details returned successfully.', type: CartDto })
    @ApiParam({ name: 'userId', required: true, description: 'ID of the user' })
    async getCart(@Param() params: GetCartUserIdParamDto): Promise<CartDto> {
        try {
            const payload = await this.cartService.getCartByUserId(params.userId);
            return plainToInstance(CartDto, payload);
        } catch (error) {
            if (error.isAxiosError) {
                throw new Error(`Axios error: ${error.message}`);
            }
            throw error;
        }
    }

    @Post(':shoppingCartId/add-item')
    @ApiBody({ type: CartRequestOperationDto })
    @ApiParam({ name: 'shoppingCartId', required: true, description: 'ID of the shopping cart' })
    @ApiOperation({ summary: 'Add item to shopping cart' })
    @ApiResponse({ status: 201, description: 'Item added to cart successfully.' })
    async addItem(@Param() params: GetCartIdParamDto, @Body() item: CartRequestOperationDto) {
        const payload: CartOperationDto = { operation: CartOperationType.ADD, productId: item.productId, quantity: item.quantity };
        try {
            return await this.cartService.addItem(params.shoppingCartId, payload);
        } catch (error) {
            if (error.exception_type === 'InvalidShoppingCartIdError') {
                throw new BadRequestException(`ShoppingCartId is invalid: ${params.shoppingCartId}`);
            }
            throw error;
        }
    }

    @Post(':shoppingCartId/remove-item')
    @ApiBody({ type: CartRequestOperationDto })
    @ApiParam({ name: 'shoppingCartId', required: true, description: 'ID of the shopping cart' })
    @ApiOperation({ summary: 'Remove item from shopping cart' })
    @ApiResponse({ status: 200, description: 'Item removed from cart successfully.' })
    async removeItem(@Param() params: GetCartIdParamDto, @Body() item: CartRequestOperationDto) {
        const payload: CartOperationDto = { operation: CartOperationType.REMOVE, productId: item.productId, quantity: item.quantity };
        try {
            return await this.cartService.removeItem(params.shoppingCartId, payload);
        } catch (error) {
            if (error.exception_type === 'InvalidShoppingCartIdError') {
                throw new BadRequestException(`ShoppingCartId is invalid: ${error.message}`);
            }
            throw error;
        }
    }
}
