import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/product.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product)
    private readonly userModel: typeof Product,
    private readonly userRepository: UserRepository,
  ) {}

  async createProduct(product: CreateProductDto) {
    return await Product.create(product);
  }

  async getAllProducts(page,limit,queryParams){
return await Product.findAndCountAll({
  offset: (page - 1) * limit,
  limit,
});
  }
}
