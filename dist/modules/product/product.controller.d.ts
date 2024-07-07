import { ProductService } from './product.service';
import { Product } from './product.model';
import { CreateProductDto, GetProductBySellerDto } from './dto/product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(product: CreateProductDto): Promise<Product>;
    findAll(page: number, limit: number, queryParams: GetProductBySellerDto): Promise<{
        rows: Product[];
        count: number;
    }>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product>;
    remove(id: string): Promise<void>;
}
