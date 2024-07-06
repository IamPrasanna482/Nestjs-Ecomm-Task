import { Model } from "sequelize-typescript";
import { Product } from "../product/product.model";
export declare class User extends Model<User> {
    user_id: string;
    email: string;
    password: string;
    full_name: string;
    age?: number;
    gender?: string;
    mobile_number?: string;
    role: string;
    products: Product[];
    orders: Product[];
}
