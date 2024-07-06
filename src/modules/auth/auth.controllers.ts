import { Body, Controller, Head, Post, Put, Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth.changePW.dto";


// controller for the /auth endpoint
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    // /auth/login POST endpoint for login user and return the JWT Token
    @Post('login')
    async login(@Body() LoginDto:LoginDto){
        const {email, password, role} = LoginDto;
        
        // call the login function from the authService file
        return this.authService.login(email, password, role);
    }
}


// export the AuthControoler class
module.exports = {AuthController};

