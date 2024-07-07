import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';

@Table
export class OrderProduct extends Model<OrderProduct> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  order_id: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_id: string;

  @BelongsTo(() => Order, { onDelete: 'CASCADE', hooks: true })
  order: Order;

  @BelongsTo(() => Product, { onDelete: 'CASCADE', hooks: true })
  product: Product;
}
