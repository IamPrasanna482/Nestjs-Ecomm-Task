import { IsString, IsEmail, IsNumber, IsBoolean, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UUID } from 'crypto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  mobile_number?: string;

  @IsString()
  // @IsIn(Object.values(USER_ROLE))
  @IsNotEmpty()
  role: string;
}


// defining GetUserParamsDTO
export class GetUserParamsDto {
  @IsNotEmpty()
  @IsOptional()
  id: UUID;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  full_name: string;

  @IsString()
  @IsOptional()
  mobile_number: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  role: string;

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

