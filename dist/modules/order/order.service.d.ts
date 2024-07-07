import { Order } from "./order.model";
import { CreateOrderDto, GetOrderParamsDto, updateOrderDto } from './dto/order.dto';
import { OrderRepository } from "./order.repository";
export declare class OrderService {
    private readonly orderModel;
    private readonly orderRepository;
    constructor(orderModel: typeof Order, orderRepository: OrderRepository);
    createOrder(createOrderDto: CreateOrderDto): Promise<any>;
    deleteOrder(id: number): Promise<void>;
    getAllOrders(params: GetOrderParamsDto): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    updateOrder(id: number, updateOrderDto: updateOrderDto): Promise<Order>;
}
