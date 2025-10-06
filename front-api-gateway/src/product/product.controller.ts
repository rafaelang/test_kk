import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginatedProductsDto, PaginationParamsDto } from './dtos/produc.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of products', type: [PaginatedProductsDto] })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getProducts(@Query() query: PaginationParamsDto): Promise<PaginatedProductsDto> {
        try {
            return await this.productService.getProducts(query.limit, query.offset);
        } catch (error) {
            if (error.isAxiosError) {
                throw new Error(`Axios error: ${error.message}`);
            }
            throw error;
        }
    }
}
