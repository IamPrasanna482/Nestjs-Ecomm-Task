import { Model } from 'sequelize-typescript';
import { User } from '../user/user.model';
export declare class Product extends Model<Product> {
    id: string;
    user_id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    rating?: number;
    user: User;
}
