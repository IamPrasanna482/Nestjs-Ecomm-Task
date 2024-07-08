export declare class CreateProductDto {
    user_id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    rating?: number;
}
export declare class GetProductBySellerDto {
    seller_id: string;
    rating: number;
}
export declare class GetProductsDto {
    product_id: string;
    name: string;
    price: number;
    stock: number;
    rating?: number;
    limit: number;
    offset: number;
}
