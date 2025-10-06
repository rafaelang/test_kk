import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartProduct } from './cart.entity';
import { CartDao, CartProductDao } from './daos/cart.dao';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import axios from 'axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartProduct]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
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
    CartService,
    CartDao,
    CartProductDao,
  ],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
