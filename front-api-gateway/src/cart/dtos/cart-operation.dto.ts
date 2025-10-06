import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum CartOperationType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
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