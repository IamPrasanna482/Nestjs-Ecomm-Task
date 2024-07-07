import { Column, DataType, HasMany, Index, Model, Table } from "sequelize-typescript";
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

  @Index('user_full_name')
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

  @Index('user_role')
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
  orders: Order[];
}
