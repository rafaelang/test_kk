import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { AxiosInstance } from 'axios';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_HTTP_CLIENT')
    private readonly httpService: any,
  ) {}

  async getProducts(limit: number = 10, offset: number = 0): Promise<any> {
    const response = await this.httpService.get('/products', {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  }
}
