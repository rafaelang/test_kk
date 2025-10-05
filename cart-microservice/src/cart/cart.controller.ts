import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @Get(':cartId')
    async getCart(@Param('cartId') cartId: string) {
        //await new Promise(resolve => setTimeout(resolve, 2000));
        return this.cartService.getCartById(cartId);
    }
}
