import { ApiProperty } from '@nestjs/swagger';


export class ProductDto {
    @ApiProperty({
        description: 'The unique identifier of the product.',
        example: '123',
    })
    productId: string;

    @ApiProperty({
        description: 'The price of the product.',
        example: 19.99,
    })
    price: number;
}