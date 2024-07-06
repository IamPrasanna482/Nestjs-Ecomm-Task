import { Column, DataType, HasMany, IsEmail, IsIn, Model, Table, Unique } from "sequelize-typescript";
import { IsNotEmpty } from "class-validator";
import { Product } from "../product/product.model";
import { Order } from "../order/order.model";

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  user_id: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  full_name: string;

  @Column({
    allowNull: true,
  })
  age?: number;

  @Column({
    allowNull: true,
  })
  gender?: string;

  @Column({
    allowNull: true,
  })
  mobile_number?: string;

  @Column({
    allowNull: true,
  })
  role: string;

  @HasMany(() => Product, {
    onDelete: 'CASCADE',
  })
  products: Product[];

  @HasMany(() => Order, {
    onDelete: 'CASCADE',
  })
  orders: Product[];
}