import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getAllProducts(page, limit, queryParams) {
    return await Product.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      where:{
        rating : queryParams.rating
      }
    });
  }

  async updateProduct(
    id: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const { user_id } = updateProductDto;
    if (product.user_id != user_id) {
      throw new UnauthorizedException(
        'Only the owner can update the product !',
      );
    }

    return product.update(updateProductDto);
  }
  async deleteProduct(id: string): Promise<void> {
    const result = await Product.destroy({ where: { id } });
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }

  async findProduct(id:string){
    return Product.findByPk(id);
  }
}
