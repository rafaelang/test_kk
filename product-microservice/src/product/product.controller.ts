import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dtos/product.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    //await new Promise(resolve => setTimeout(resolve, 2000));
    return this.productService.findAll();
  }

  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    return await this.productService.findByProductId(+productId);
  }

  @Patch('patch')
  @ApiBody({
    type: ProductDto,
    description: 'Simple development test patch route product payload',
  })
  patch(@Body() body: ProductDto): Promise<ProductDto> {
    return this.productService.createOrUpdate(body);
  }
}
