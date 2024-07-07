import { UUID } from 'crypto';
declare class OrderProductDto {
    product_id: string;
    quantity: number;
}
export declare class CreateOrderDto {
    customer_id: string;
    shipping_address: string;
    products: OrderProductDto[];
}
export declare class GetOrderParamsDto {
    customer_id: UUID;
    limit: number;
    offset: number;
    sortBy: string;
    order: string;
}
export declare class updateOrderDto {
    shipping_address: string;
    status: string;
}
export {};
