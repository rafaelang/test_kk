import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProductOperationDto } from './dtos/cart.dto';
import { UsePipes, ValidationPipe, Body } from '@nestjs/common';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @Get(':userId')
    async getCart(@Param('userId') userId: number) {
        //await new Promise(resolve => setTimeout(resolve, 2000));
        //TODO: calcular os totais
        return this.cartService.getCartByUserId(userId);
    }

    @MessagePattern('update_cart')
    async updateCart(@Body() data: { shoppingCartId: number; item: ProductOperationDto }) {
        return this.cartService.updateCart(data.shoppingCartId, data.item);
    }
}
