import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsDecimal, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @ApiProperty({
    description: 'The unique identifier of the product.',
    example: '123',
  })
  @Type(() => Number)
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'The price of the product.',
    example: 19.99,
  })
  @Type(() => Number)
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  price: number;
}

export class PaginationParamsDto {
  @ApiProperty({
    description: 'Number of items to return',
    example: 10,
    required: false,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip',
    example: 0,
    required: false,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  offset?: number;
}

export class PaginatedProductsDto {
  @ApiProperty({
    description: 'List of products',
    type: [ProductDto],
  })
  results: ProductDto[];

  @ApiProperty({
    description: 'Total number of products',
    example: 100,
  })
  @Type(() => Number)
  @IsInt()
  total: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  totalPages: number;
}
