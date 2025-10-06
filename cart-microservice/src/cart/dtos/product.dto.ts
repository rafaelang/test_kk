import { Type } from "class-transformer";
import { IsInt, IsDecimal } from "class-validator";

export class ProductDto {
    @Type(() => Number)
    @IsInt()
    productId: number;

    @Type(() => Number)
    @IsDecimal({ decimal_digits: '2', force_decimal: true })
    price: number;
}