import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/product.dto';
import { Product } from './product.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async findAll() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return this.productService.findAll();
  }

  @Patch('patch')
  @ApiBody({
    type: ProductDto,
    description: 'Simple development test patch route product payload',
  })
  patch(@Body() body: ProductDto): Promise<Product> {
    return this.productService.createOrUpdate(body);
  }
}
