import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { OrderProduct } from './order-product.model';
import { Product } from '../product/product.model';
import { Order } from '../order/order.model';
@Module({
  imports: [SequelizeModule.forFeature([OrderProduct]), Product, Order],
//   exports : [OrderProduct]
})
export class OrderProductModule {}
