import { Order } from "./order.model";
import { CreateOrderDto, GetOrderParamsDto } from "./dto/order.dto";
import { OrderRepository } from "./order.repository";
export declare class OrderService {
    private readonly orderModel;
    private readonly orderRepository;
    constructor(orderModel: typeof Order, orderRepository: OrderRepository);
    createOrder(createOrderDto: CreateOrderDto): Promise<any>;
    getAllOrders(params: GetOrderParamsDto): Promise<Order[]>;
}
