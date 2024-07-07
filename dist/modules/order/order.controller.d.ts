import { OrderService } from './order.service';
import { CreateOrderDto, GetOrderParamsDto, updateOrderDto } from './dto/order.dto';
import { Order } from './order.model';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<any>;
    deleteOrder(id: number): Promise<void>;
    getAllOrders(params: GetOrderParamsDto): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    updateOrder(id: number, updateOrderDto: updateOrderDto): Promise<Order>;
}
