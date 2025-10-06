import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CartUserIdParamDto, ProductOperationDto } from './dtos/cart.dto';
import { Body } from '@nestjs/common';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @Get(':userId')
    @ApiParam({ name: 'userId', required: true, description: 'ID of the user' })
    @ApiOperation({ summary: 'Get cart details for a user' })
    async getCart(@Param() params: CartUserIdParamDto) {
        //await new Promise(resolve => setTimeout(resolve, 2000));
        return this.cartService.getCartByUserId(params.userId);
    }

    @MessagePattern('update_cart')
    async updateCart(@Body() data: { userId: number; shoppingCartId: number; item: ProductOperationDto }) {
        try {
            return await this.cartService.updateCart(data.userId, data.shoppingCartId, data.item);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'Failed to update cart',
                exception_type: error.name || 'UnknownException',
            });
        }
    }
}
