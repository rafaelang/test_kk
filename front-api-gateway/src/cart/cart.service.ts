import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class CartService {
    private readonly baseURL: string;

    constructor(
        @Inject("CART_HTTP_CLIENT")
        private readonly httpService: any
    ) { }

    async getCart(cartId: string) {
        const response = await this.httpService.get(`/cart/${cartId}`);
        return response.data;
    }
}
