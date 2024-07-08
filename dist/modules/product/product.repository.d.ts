import { Product } from './product.model';
import { CreateProductDto } from './dto/product.dto';
import { UserRepository } from '../user/user.repository';
export declare class ProductRepository {
    private readonly userModel;
    private readonly userRepository;
    constructor(userModel: typeof Product, userRepository: UserRepository);
    createProduct(product: CreateProductDto): Promise<Product>;
    getAllProducts(queryOptions?: any, limit?: number, offset?: number): Promise<Product[]>;
    updateProduct(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    findProduct(id: string): Promise<Product>;
}
