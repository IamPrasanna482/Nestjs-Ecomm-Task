import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CreateProductDto, GetProductBySellerDto } from './dto/product.dto';
import { query } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    const { user_id } = product;

    const canAccess = await this.productService.canPostProduct(user_id); // await for async function

    if (!canAccess) {
      throw new HttpException(
        'Only seller can post a product!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.productService.createProduct(product);
    }
  }

  // Uncomment and implement these methods if needed
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() queryParams: GetProductBySellerDto,
  ): Promise<{ rows: Product[]; count: number }> {
    return this.productService.findAll(page, limit, queryParams);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Product> {
  //   return this.productService.findOne(id);
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: Partial<CreateProductDto>,
  // ): Promise<Product> {
  //   return this.productService.update(id, updateProductDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.productService.remove(id);
  // }
}
