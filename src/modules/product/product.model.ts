import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
  Index,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Product extends Model<Product> {
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
  user_id: string;

  @Index('product_name')
  @Column
  name: string;

  @Column({
    allowNull: true,
  })
  description?: string;

  @Column
  price: number;

  @Column
  stock: number;

  @Column({
    allowNull: true,
  })
  rating?: number;

  @BelongsTo(() => User)
  user: User;
}
