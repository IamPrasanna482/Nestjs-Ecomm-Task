import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
  AllowNull,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { UUID } from 'crypto';

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

  // @ForeignKey(() => User)
  // @Column
  // user_id: number;

  @BelongsTo(() => User)
  user: User;
}
