import { Type } from 'class-transformer';
import { IsDecimal, IsInt } from 'class-validator';

export enum CartOperationType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export class ProductDto {
  @Type(() => Number)
  @IsInt()
  productId: number;

  @Type(() => Number)
  @IsInt()
  price: number;

  @Type(() => Number)
  @IsInt()
  quantity: number;
}

export class ProductOperationDto extends ProductDto {
  @Type(() => String)
  operation: CartOperationType;
}

export class CartDto {
  @Type(() => Number)
  @IsInt()
  shoppingCartId: number;

  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  totalPrice: number;

  @Type(() => Number)
  @IsInt()
  totalQuantity: number;

  @Type(() => ProductDto)
  products: ProductDto[];
}

export class CartUserIdParamDto {
  @Type(() => Number)
  @IsInt()
  userId: number;
}
