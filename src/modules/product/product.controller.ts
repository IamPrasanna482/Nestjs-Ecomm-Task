import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CreateProductDto, GetProductBySellerDto } from './dto/product.dto';
import { query } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Endpoint to create a product
  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    const { user_id } = product;

    // only user with 'seller' role can create a product
    const canAccess = await this.productService.canPostProduct(user_id);

    if (!canAccess) {
      throw new HttpException(
        'Only seller can post a product!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.productService.createProduct(product);
    }
  }

  // Endpoint to get all products
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() queryParams: GetProductBySellerDto,
  ): Promise<{ rows: Product[]; count: number }> {
    return this.productService.findAll(page, limit, queryParams);
  }

  // Endpoint to get a product by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Endpoint to update a product
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  // Endpoint to delete a product
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
