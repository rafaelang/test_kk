import { Module } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), CartModule, ProductModule],
  controllers: [CartController, ProductController],
  providers: [CartService, ProductService],
})
export class AppModule {}
