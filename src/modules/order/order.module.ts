import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { UserModule } from '../user/user.module';
import { OrderProductModule } from '../common/order-product.module';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { OrderProduct } from '../common/order-product.model';
@Module({
  imports: [
    SequelizeModule.forFeature([Order, Product, User, OrderProduct]),
    UserModule,
    OrderProductModule,
    ProductModule,
    Product,
    User,
    OrderProduct,
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
