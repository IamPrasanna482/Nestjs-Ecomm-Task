import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/user.dto';
import { Sequelize } from 'sequelize-typescript';
import { NotFoundError } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly sequelize:Sequelize
  ) {}


  // create a user 
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return {
      msg: 'User successfully created',
      data: {
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // find user by PK
  async findByPk(userId: string) {
    return await this.userModel.findByPk(userId);
  }

  // delete a user, using transaction to delete all the products listed by the user also
  async deleteUser(userId: string): Promise<any> {
    const transaction = await this.sequelize.transaction();
    let isCommitted = false;
    try{
      const user = await User.findByPk(userId);
      if(!user) throw new NotFoundException('User not found');

      // delete a user
      await User.destroy({
       where : {user_id: userId},
      });

      // delete the associated products also
      await Product.destroy({
        where : {
          user_id: userId,
        }
      });
      
      // commit the transaction
      await transaction.commit();
      isCommitted = true;
      throw new HttpException('User deleted successfully along with its corresponding products', HttpStatus.OK);

    }
    catch(error){
if(!isCommitted){
  // rollback if transaction is not commited
  await transaction.rollback();
}
    }
   throw new HttpException(
     'Error occured, could not delete order',
     HttpStatus.BAD_REQUEST,
   );
  }

  // find user by email
  async findbyEmail(email) {
    return await this.userModel.findAll({
      where: {
        email: email,
      },
    });
  }


  // getAllUsersByParams function to get all the users by filtering and sorting using the query paramters
  async getAllUsersByParams(
    queryOptions?: any,
    limit?: number,
    offset?: number,
    sortBy: string = 'user_id',
    order: string = 'ASC',
  ) {
    // get the filtered and sorted users
    const users = await User.findAll({
      where: queryOptions,
      limit: limit,
      offset: offset,
      order: [[sortBy, order]],
    });

    // return the users
    return users;
  }
}
