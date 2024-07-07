import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./order.model";
import {
  CreateOrderDto,
  GetOrderParamsDto,
  updateOrderDto,
} from './dto/order.dto';
import { OrderRepository } from "./order.repository";
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    private readonly orderRepository: OrderRepository,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    return this.orderRepository.createOrder(createOrderDto);
  }

    async deleteOrder(id: number): Promise<void> {
      return this.orderRepository.deleteOrder(id);
    }

  async getAllOrders(params: GetOrderParamsDto): Promise<Order[]> {
    return this.orderRepository.findAllOrders(params);
  }

    async getOrderById(id: number): Promise<Order> {
      const order = await this.orderRepository.findOrder(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    }

  async updateOrder(
    id: number,
    updateOrderDto: updateOrderDto,
  ): Promise<Order> {
    return this.orderRepository.updateOrder(id, updateOrderDto);
  }
  //   async getOrdersByUserId(userId: number): Promise<Order[]> {
  //     return this.orderRepository.findOrdersByUserId(userId);
  //   }
}