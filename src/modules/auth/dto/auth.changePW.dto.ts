import { IsEmail, IsInt, IsNumber, IsString, isString } from 'class-validator';


// LoginDTO for the /auth/login endpoint
export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}

