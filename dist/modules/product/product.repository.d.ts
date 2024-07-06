import { Product } from './product.model';
import { CreateProductDto } from './dto/product.dto';
import { UserRepository } from '../user/user.repository';
export declare class ProductRepository {
    private readonly userModel;
    private readonly userRepository;
    constructor(userModel: typeof Product, userRepository: UserRepository);
    createProduct(product: CreateProductDto): Promise<Product>;
    getAllProducts(page: any, limit: any, queryParams: any): Promise<{
        rows: Product[];
        count: number;
    }>;
}
