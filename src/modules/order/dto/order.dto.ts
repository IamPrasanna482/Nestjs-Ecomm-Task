import {
  IsNumber,
  IsString,
  IsDate,
  IsNotEmpty,
  IsUUID,
  IsArray,
  IsOptional,
  isEmail,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'crypto';
// export class CreateOrderDto {
//   @IsNumber()
//   userId: number;

//   @IsString()
//   @IsNotEmpty()
//   orderName: string;

//   @IsNumber()
//   @IsNotEmpty()
//   orderAmount: number;

//   @IsString()
//   @IsNotEmpty()
//   orderStatus: string;

//   @IsString()
//   @IsNotEmpty()
//   orderPaymentMode: string;

//   @IsDate()
//   @IsNotEmpty()
//   orderDate: Date;
// }

class OrderProductDto {
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  customer_id: string;

  @IsString()
  address: string;

  @IsArray()
  @IsNotEmpty()
  products: OrderProductDto[];
}


export class GetOrderParamsDto {
  @IsNotEmpty()
  @IsOptional()
  customer_id: UUID;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;

  @IsString()
  @IsOptional()
  sortBy: string;

  @IsString()
  @IsOptional()
  order: string;
}


