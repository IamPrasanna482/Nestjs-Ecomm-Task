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
// import { UpdateOrderD
import { Order } from './order.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return this.orderService.createOrder(createOrderDto);
  }

    @Delete(':id')
    async deleteOrder(@Param('id') id: number): Promise<void> {
      return this.orderService.deleteOrder(id);
    }

  @Get()
  async getAllOrders(@Query() params: GetOrderParamsDto): Promise<Order[]> {
    return this.orderService.getAllOrders(params);
  }

    @Get(':id')
    async getOrderById(@Param('id') id: number): Promise<Order> {
      return this.orderService.getOrderById(id);
    }

  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: updateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

}
