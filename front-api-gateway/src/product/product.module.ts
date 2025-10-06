import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import axios from 'axios';
import { ProductDto } from './dtos/produc.dto';

@Module({
  providers: [
    {
      provide: 'PRODUCT_HTTP_CLIENT',
      useFactory: (configService: ConfigService) => {
        const axiosInstance = axios.create({
          timeout: 5000,
          maxRedirects: 5,
        });
        axiosInstance.defaults.baseURL =
          configService.get<string>('PRODUCT_API_URL');
        return axiosInstance;
      },
      inject: [ConfigService],
    },
    ProductService,
    ConfigService,
  ],
  exports: [ProductService, 'PRODUCT_HTTP_CLIENT'],
})
export class ProductModule {}
