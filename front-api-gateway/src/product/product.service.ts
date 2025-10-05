import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { AxiosInstance } from 'axios';

@Injectable()
export class ProductService {
    constructor(
        @Inject("PRODUCT_HTTP_CLIENT")
        private readonly httpService: any,
    ) { }

    async getProducts() {
        const response = await this.httpService.get('/product/list');
        return response.data;
    }
}
