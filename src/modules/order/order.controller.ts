// src/orders/order.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, GetOrderParamsDto, updateOrderDto } from './dto/order.dto';
import { Order } from './order.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Endpoint to create a order
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return this.orderService.createOrder(createOrderDto);
  }

  // Endpoint to delete a order
  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }

  // Endpoint to get all orders
  @Get()
  async getAllOrders(@Query() params: GetOrderParamsDto): Promise<Order[]> {
    return this.orderService.getAllOrders(params);
  }

  // Endpoint to get an order by id
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  // Endpoint to update an order by id
  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: updateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }
}
