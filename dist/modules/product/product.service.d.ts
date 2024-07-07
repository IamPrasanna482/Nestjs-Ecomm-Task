import { Product } from './product.model';
import { CreateProductDto, GetProductBySellerDto } from './dto/product.dto';
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
    findAll(page: number, limit: number, queryParams: GetProductBySellerDto): Promise<{
        rows: Product[];
        count: number;
    }>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product>;
    remove(id: string): Promise<void>;
}
