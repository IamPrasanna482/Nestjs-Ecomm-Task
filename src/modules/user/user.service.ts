import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto, GetUserParamsDto } from "./dto/user.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly UserRepository: UserRepository,
  ) {}

  // create user function to create a user
  async createUser(user: CreateUserDto) {

    // hash the password using bcrypt
    const pw = user.password;
    const hashedPW = await bcrypt.hash(pw, 5); 
    user.password = hashedPW;

    return await this.UserRepository.createUser(user);
  }

  // delete a user 
  async deleteUser(userId: string): Promise<void> {
    return await this.UserRepository.deleteUser(userId);
  }

  // get all users from DB
  async getAllUsers(params: GetUserParamsDto) {
    const {
      full_name,
      email,
      gender,
      age,
      role,
      limit = 10,
      offset = 0,
    } = params;

    // add all the query paramns into a queryOptions object for filtering
    const queryOptions: any = {};

    if (role) queryOptions.role = role;
    if (full_name) queryOptions.full_name = full_name;
    if (email) queryOptions.email = email;
    if (gender) queryOptions.gender = gender;
    if (age) queryOptions.age = age;
    if (role) queryOptions.role = role;

    // call the getAllUsersByParams() function in the UserRepository file
    const users = await this.UserRepository.getAllUsersByParams(
      queryOptions,
      limit, // pass limit alongside queryOptions
      offset, // pass offset alongside queryOptions
      params.sortBy, // pass sortBy alongside queryOptions
      params.order, // pass order alongside queryOptions
    );

    // return the filtered users
    return users;
  }

  // canGetAccess function to authorize user for /users GET endpoint on the basis of role
  async canGetAccess(token: string): Promise<boolean> {
    // decode the JWT token using jwt.verify() method
    const decodedToken = jwt.verify(token, '2020b0101032') as {
      role: string;
    };

    // extract the role part and check against admin
    if (decodedToken.role != 'admin') {
      return false;
    }

    // return true if the user is admin
    return true;
  }
}