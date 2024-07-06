import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { OrderProduct } from '../common/order-product.model';
// import { OrderProduct } from '../order-product/order-product.model';

@Table
export class Order extends Model<Order> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customer_id: string;

  @Column({
    type: DataType.DATE,
    // allowNull: false,
  })
  order_date: Date;

  @Column
  status: string;

  @Column
  total_amount: number;

  @Column
  shipping_address: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];
}
