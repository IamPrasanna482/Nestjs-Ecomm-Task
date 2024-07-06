import { UserService } from '../user/user.service';
import { Body, Get, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../user/user.repository';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly UserRepository: UserRepository,
    ) {}

    // login function
    async login(email: string, password: string, role: string) {
        // check if the user with email exists or not
        const existingUser = await User.findOne({ where: { email: email } });

        // throw error if requested user dont exist
        if (!existingUser) {
            throw new HttpException(
                'Email ID is not registered !',
                HttpStatus.BAD_REQUEST,
            );
        }

        // check if the password is correct or not
        const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password,
        );

        // throw error is the password entered is incorrect
        if (!isValidPassword) {
            throw new HttpException(
                'Please enter correct password !',
                HttpStatus.BAD_REQUEST,
            );
        }

        // generate JWT token using jwt.sign() method
        const token = jwt.sign(
            {
                email: email,
                password: password,
                role: role,
            },
            '2020b0101032', // JWT key
        );

        // return the response containing the JWT Key
        return {
            msg: `user with email ${email} is successfully logged in using the token!`,
            token: `${token}`,
        };
    }

}

// export the AuthService class
module.exports = {AuthService}
