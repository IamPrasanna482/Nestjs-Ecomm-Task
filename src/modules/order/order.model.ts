import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  DataType,
  Index,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { OrderProduct } from '../common/order-product.model';

@Table
export class Order extends Model<Order> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Index('customer_id')
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customer_id: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  order_date: Date;

  @Index('status')
  @Column
  status: string;

  @Column
  total_amount: number;

  @Column
  shipping_address: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];
}
