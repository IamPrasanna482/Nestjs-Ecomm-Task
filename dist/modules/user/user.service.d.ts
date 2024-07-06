import { User } from "./user.model";
import { CreateUserDto, GetUserParamsDto } from "./dto/user.dto";
import { UserRepository } from "./user.repository";
export declare class UserService {
    private readonly userModel;
    private readonly UserRepository;
    constructor(userModel: typeof User, UserRepository: UserRepository);
    createUser(user: CreateUserDto): Promise<{
        msg: string;
        data: {
            name: string;
            email: string;
            role: string;
        };
    }>;
    deleteUser(userId: string): Promise<void>;
    getAllUsers(params: GetUserParamsDto): Promise<User[]>;
    canGetAccess(token: string): Promise<boolean>;
}
