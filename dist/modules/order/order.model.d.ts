import { Model } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
export declare class Order extends Model<Order> {
    id: string;
    customer_id: string;
    order_date: Date;
    status: string;
    total_amount: number;
    shipping_address: string;
    user: User;
    products: Product[];
}
