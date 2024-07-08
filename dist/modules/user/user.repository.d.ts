import { User } from './user.model';
import { CreateUserDto } from './dto/user.dto';
import { Sequelize } from 'sequelize-typescript';
export declare class UserRepository {
    private readonly userModel;
    private readonly sequelize;
    constructor(userModel: typeof User, sequelize: Sequelize);
    createUser(createUserDto: CreateUserDto): Promise<{
        msg: string;
        data: {
            name: string;
            email: string;
            role: string;
        };
    }>;
    findByPk(userId: string): Promise<User>;
    deleteUser(userId: string): Promise<any>;
    findbyEmail(email: any): Promise<User[]>;
    getAllUsersByParams(queryOptions?: any, limit?: number, offset?: number, sortBy?: string, order?: string): Promise<User[]>;
}
