import { Model } from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';
export declare class OrderProduct extends Model<OrderProduct> {
    id: string;
    order_id: string;
    product_id: string;
    order: Order;
    product: Product;
}
