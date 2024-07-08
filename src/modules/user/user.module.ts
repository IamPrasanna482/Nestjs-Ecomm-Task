import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { Order } from '../order/order.model';
import { UserRepository } from './user.repository';
import { Product } from '../product/product.model';
import { Order } from '../order/order.model';

@Module({
  imports: [SequelizeModule.forFeature([User,Product,Order])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserRepository,UserService],
})
export class UserModule {}
