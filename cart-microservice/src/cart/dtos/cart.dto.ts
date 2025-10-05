export enum CartOperationType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

export class ProductDto {
    productId: number;
    price: number;
    quantity: number;
}

export class ProductOperationDto extends ProductDto {
    operation: CartOperationType;
}

export class CartDto {
    shoppingCartId: number;
    userId: number;
    totalPrice: number;
    totalQuantity: number;
    products: ProductDto[];
}