import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

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

  async findByPk(userId: string) {
    return await this.userModel.findByPk(userId); // Use findByPk directly on the model
  }

  async deleteUser(userId: string): Promise<any> {
    await this.userModel.destroy({ where: { user_id: userId } });
    return { msg: 'user deleted successfully' };
  }

  async findbyEmail(email) {
    return await this.userModel.findAll({
      where: {
        email: email,
      },
    });
  }

  // getAllUsersByParams function to get al the users by filtering and sorting using the query paramters
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
