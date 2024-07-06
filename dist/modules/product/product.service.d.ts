import { Product } from './product.model';
import { CreateProductDto, GetProductBySellerDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { UserRepository } from '../user/user.repository';
export declare class ProductService {
    private readonly productModel;
    private readonly productRepository;
    private readonly userRepository;
    constructor(productModel: typeof Product, productRepository: ProductRepository, userRepository: UserRepository);
    canPostProduct(user_id: string): Promise<boolean>;
    createProduct(productInfo: CreateProductDto): Promise<Product>;
    findAll(page: number, limit: number, queryParams: GetProductBySellerDto): Promise<{
        rows: Product[];
        count: number;
    }>;
}
