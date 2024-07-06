import { UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, GetUserParamsDto } from "./dto/user.dto";
export declare class UserController {
    private readonly UserService;
    constructor(UserService: UserService);
    findAll(req: Request, params: GetUserParamsDto): Promise<import("./user.model").User[] | UnauthorizedException>;
    createUser(createUserDto: CreateUserDto): Promise<{
        msg: string;
        data: {
            name: string;
            email: string;
            role: string;
        };
    }>;
    deleteUser(userId: string): Promise<void>;
}
