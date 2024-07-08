import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import {
  CreateProductDto,
  GetProductBySellerDto,
  GetProductsDto,
} from './dto/product.dto';
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

  async findAll(
    queryParams: GetProductsDto,
  ){
    // const user = this.userRepository.findByPk(queryParams.);
    // if ((await user).role != 'seller') {
    //   throw new HttpException(
    //     'Only sellers can access their products !',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const { rating, price, name, stock, limit = 10, offset = 0 } = queryParams;
    const queryOptions: any = {};
    
    if (rating) queryOptions.rating = rating;
    if (price) queryOptions.price = price;
    if (name) queryOptions.name = name;
    if (stock) queryOptions.stock = stock;

    return this.productRepository.getAllProducts(queryOptions, limit, offset);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.productRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.deleteProduct(id);
  }
}
