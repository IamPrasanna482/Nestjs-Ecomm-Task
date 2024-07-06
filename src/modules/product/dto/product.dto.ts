import { IsNotEmpty, IsOptional, IsNumber, IsString, IsUUID } from 'class-validator';
import { DataType } from 'sequelize';

export class CreateProductDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  rating?: number;
}

export class GetProductBySellerDto{
  @IsOptional()
  @IsUUID()
  seller_id: string
}