// src/orders/order.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto, GetOrderParamsDto } from './dto/order.dto';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { DataType } from 'sequelize-typescript';
import { OrderProduct } from '../common/order-product.model';
import { Sequelize } from 'sequelize-typescript';

// import { UpdateOrderDto } from './dto/update-order.dto';

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

      // Create order
      const order = await this.orderModel.create(
        {
          order_date: new Date(),
          total_amount: totalAmount,
          status: 'Pending',
          shipping_address: orderDto.address,
          customer_id: orderDto.customer_id,
        },
        { transaction },
      );

      // Map products to order in OrderProduct table
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

  //   async deleteOrder(id: number): Promise<void> {
  //     await this.orderModel.destroy({ where: { id } });
  //   }

  async findAllOrders(params: GetOrderParamsDto): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { customer_id: params.customer_id },
      include: [
        {
          model: User,
          attributes: ['user_id', 'full_name', 'email'], // Specify user attributes you want to include
        },
        {
          model: Product,
          through: { attributes: [] }, // This ensures that only Product attributes are returned
          attributes: ['id', 'name', 'price'], // Specify product attributes you want to include
        },
      ],
    });
  }
  //   async findOrderById(id: number): Promise<Order> {
  //     return this.orderModel.findByPk(id);
  //   }

  //   async updateOrder(
  //     id: number,
  //     updateOrderDto: UpdateOrderDto,
  //   ): Promise<Order> {
  //     const order = await this.findOrderById(id);
  //     return order.update(updateOrderDto);
  //   }

  //   async findOrdersByUserId(userId: number): Promise<Order[]> {
  //     return this.orderModel.findAll({ where: { user_id } });
  //   }
}
