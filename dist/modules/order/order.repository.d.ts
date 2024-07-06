import { Order } from './order.model';
import { CreateOrderDto, GetOrderParamsDto } from './dto/order.dto';
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
    findAllOrders(params: GetOrderParamsDto): Promise<Order[]>;
}
