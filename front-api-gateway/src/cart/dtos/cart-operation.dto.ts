import { CartProduct } from './../../../../cart-microservice/src/cart/cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductDto } from '../../product/dtos/produc.dto';

export enum CartOperationType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

export class CartProductDto extends ProductDto {
    @ApiProperty({
        description: 'The quantity of the product in the cart.',
        example: 2,
    })
    @IsInt()
    @Min(1)
    quantity: number;
}

export class CartRequestOperationDto {
    @ApiProperty({
        description: 'The unique identifier of the product.',
        example: '123',
    })
    @IsString()
    productId: string;

    @ApiProperty({
        description: 'The requested quantity of the product.',
        example: '2',
    })
    @IsInt()
    @Min(1)
    quantity: number;
}

export class CartOperationDto {
    @IsEnum(CartOperationType)
    operation: CartOperationType;

    @IsString()
    productId: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

export class GetCartIdParamDto {
    @ApiProperty({
        description: 'The unique identifier of the shopping cart.',
        example: '11333',
        required: true,
    })
    @IsInt()
    @Type(() => Number)
    shoppingCartId: number;
}

export class GetCartUserIdParamDto {
    @ApiProperty({
        description: 'The unique identifier of the user.',
        example: '5678',
        required: true,
    })
    @IsInt()
    @Type(() => Number)
    userId: number;
}

export class CartDto {
    @ApiProperty({
        description: 'The unique identifier of the cart.',
        example: '123',
    })
    @IsInt()
    @Type(() => Number)
    shoppingCartId: number;

    @ApiProperty({
        description: 'The unique identifier of the user.',
        example: '5678',
    })
    @IsInt()
    @Type(() => Number)
    userId: number;

    @ApiProperty({
        description: 'The total price of all items in the cart.',
        example: 59.97,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Type(() => Number)
    totalPrice: number;

    @ApiProperty({
        description: 'The total quantity of all items in the cart.',
        example: 3,
    })
    @IsInt()
    @Type(() => Number)
    totalQuantity: number;

    @ApiProperty({
        description: 'List of products in the cart.',
        type: [ProductDto],
        required: false,
    })
    @IsOptional()
    @Type(() => CartProductDto)
    products?: CartProductDto[];
}