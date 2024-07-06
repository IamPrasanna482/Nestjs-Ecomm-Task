import { User } from './user.model';
import { CreateUserDto } from './dto/user.dto';
export declare class UserRepository {
    private readonly userModel;
    constructor(userModel: typeof User);
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
