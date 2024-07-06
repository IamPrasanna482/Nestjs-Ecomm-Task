import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto, GetProductBySellerDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async canPostProduct(user_id: string): Promise<boolean> {
    const user = await this.userRepository.findByPk(user_id); // Await for async function
    return user && user.role === 'seller';
  }

  async createProduct(productInfo: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(productInfo);
  }

  // Uncomment and update the methods as needed

  async findAll(
    page: number,
    limit: number,
    queryParams: GetProductBySellerDto,
  ): Promise<{ rows: Product[]; count: number }> {
    const user = this.userRepository.findByPk(queryParams.seller_id);
    if((await user).role != 'seller'){
        throw new HttpException(
          'Only sellers can access their products !',
          HttpStatus.BAD_REQUEST,
        );
    }
    else return this.productRepository.getAllProducts(page, limit, queryParams);
  }

  // async findOne(id: string): Promise<Product> {
  //   const product = await this.productModel.findByPk(id);
  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return product;
  // }

  // async update(
  //   id: string,
  //   updateProductDto: Partial<CreateProductDto>,
  // ): Promise<Product> {
  //   const product = await this.findOne(id);
  //   return product.update(updateProductDto);
  // }

  // async remove(id: string): Promise<void> {
  //   const product = await this.findOne(id);
  //   await product.destroy();
  // }
}
