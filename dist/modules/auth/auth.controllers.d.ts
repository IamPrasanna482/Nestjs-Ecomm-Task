import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth.changePW.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(LoginDto: LoginDto): Promise<{
        msg: string;
        token: string;
    }>;
}
