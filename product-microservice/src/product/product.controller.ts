import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  PaginatedProductsDto,
  PaginationParamsDto,
  ProductDto,
  ProductIdParamDto,
  ProductObjectIdParamDto,
} from './dtos/product.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: PaginatedProductsDto,
  })
  async findAll(
    @Query() query: PaginationParamsDto,
  ): Promise<PaginatedProductsDto> {
    return this.productService.findAll(query.limit || 10, query.offset || 0);
  }

  //@Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'The product', type: ProductDto })
  async findOne(
    @Param() params: ProductObjectIdParamDto,
  ): Promise<Product | null> {
    const product = await this.productService.findById(params.id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'The product', type: ProductDto })
  async findOneByProductId(
    @Param() params: ProductIdParamDto,
  ): Promise<Product | null> {
    const product = await this.productService.findByProductId(params.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
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
