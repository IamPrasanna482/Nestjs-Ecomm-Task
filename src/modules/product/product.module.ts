import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    UserModule, // Import UserModule to access UserRepository
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
