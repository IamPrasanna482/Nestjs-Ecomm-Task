import { OrderService } from './order.service';
import { CreateOrderDto, GetOrderParamsDto } from './dto/order.dto';
import { Order } from './order.model';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<any>;
    getAllOrders(params: GetOrderParamsDto): Promise<Order[]>;
}
