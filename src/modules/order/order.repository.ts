// src/orders/order.repository.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import {
  CreateOrderDto,
  GetOrderParamsDto,
  updateOrderDto,
} from './dto/order.dto';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { OrderProduct } from '../common/order-product.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(OrderProduct)
    private readonly orderProductModel: typeof OrderProduct,
    private readonly sequelize: Sequelize,
  ) {}
  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    let transaction;
    try {
      transaction = await this.sequelize.transaction();

      const { products } = orderDto;
      let totalAmount = 0;

      for (const product of products) {
        const { product_id, quantity } = product;
        const price = (await this.productModel.findByPk(product_id)).price;
        totalAmount += price * quantity;
      }

      const order = await this.orderModel.create(
        {
          order_date: new Date(),
          total_amount: totalAmount,
          status: 'Pending',
          shipping_address: orderDto.shipping_address,
          customer_id: orderDto.customer_id,
        },
        { transaction },
      );

      for (const product of products) {
        await this.orderProductModel.create(
          {
            order_id: order.id,
            product_id: product.product_id,
          },
          { transaction },
        );
      }

      await transaction.commit();
      return order;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async deleteOrder(orderId: number): Promise<void> {
    const transaction = await this.sequelize.transaction();
    let isCommitted = false;
    try {
      const order = await this.orderModel.findByPk(orderId);
      if (!order) throw new NotFoundException('Order not found');

      await this.orderProductModel.destroy({
        where: { order_id: orderId },
        transaction,
      });
      await order.destroy({ transaction });

      await transaction.commit();
      isCommitted = true;
      throw new HttpException('Order deleted successfully', HttpStatus.OK);
    } catch (error) {
      if (!isCommitted) {
        await transaction.rollback();
      }
      throw new HttpException(
        'Error occured, could not delete order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllOrders(params: GetOrderParamsDto): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { customer_id: params.customer_id },
      include: [
        {
          model: User,
          attributes: ['user_id', 'full_name', 'email'],
        },
        {
          model: Product,
          through: { attributes: [] }, 
          attributes: ['id', 'name', 'price'],
        },
      ],
      limit: params.limit,
      offset: params.offset
    });
  }
  async findOrder(id: number): Promise<Order> {
    return this.orderModel.findByPk(id);
  }

  async updateOrder(
    id: number,
    updateOrderDto: updateOrderDto,
  ): Promise<Order> {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order.update(updateOrderDto);
  }
  //   async findOrdersByUserId(userId: number): Promise<Order[]> {
  //     return this.orderModel.findAll({ where: { user_id } });
  //   }
}
