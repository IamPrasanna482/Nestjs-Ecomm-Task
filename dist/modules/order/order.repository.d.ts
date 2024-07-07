import { Order } from './order.model';
import { CreateOrderDto, GetOrderParamsDto, updateOrderDto } from './dto/order.dto';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { OrderProduct } from '../common/order-product.model';
import { Sequelize } from 'sequelize-typescript';
export declare class OrderRepository {
    private orderModel;
    private readonly productModel;
    private readonly userModel;
    private readonly orderProductModel;
    private readonly sequelize;
    constructor(orderModel: typeof Order, productModel: typeof Product, userModel: typeof User, orderProductModel: typeof OrderProduct, sequelize: Sequelize);
    createOrder(orderDto: CreateOrderDto): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
    findAllOrders(params: GetOrderParamsDto): Promise<Order[]>;
    findOrder(id: number): Promise<Order>;
    updateOrder(id: number, updateOrderDto: updateOrderDto): Promise<Order>;
}
