export class ProductDto {
    productId: string;
    price: number;
    quantity: number;
}

export class CartDto {
    shoppingCartId: string;
    userId: string;
    totalPrice: number;
    totalQuantity: number;
    products: ProductDto[];
}