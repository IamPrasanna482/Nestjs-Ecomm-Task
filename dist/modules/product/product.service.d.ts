import { Product } from './product.model';
import { CreateProductDto, GetProductsDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.model';
export declare class ProductService {
    private readonly productModel;
    private readonly productRepository;
    private readonly userRepository;
    private readonly userModel;
    constructor(productModel: typeof Product, productRepository: ProductRepository, userRepository: UserRepository, userModel: typeof User);
    canPostProduct(user_id: string): Promise<boolean>;
    createProduct(productInfo: CreateProductDto): Promise<Product>;
    findAll(queryParams: GetProductsDto): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product>;
    remove(id: string): Promise<void>;
}
