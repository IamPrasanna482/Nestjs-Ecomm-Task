import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
export declare class AuthService {
    private readonly userService;
    private readonly UserRepository;
    constructor(userService: UserService, UserRepository: UserRepository);
    login(email: string, password: string, role: string): Promise<{
        msg: string;
        token: string;
    }>;
}
