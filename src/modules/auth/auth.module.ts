import { SequelizeModule } from "@nestjs/sequelize";
import { AuthController } from "../auth/auth.controllers";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/user.model";
import { UserController } from "../user/user.controller";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";


@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [AuthController, UserController],
    providers: [AuthService, UserService, UserRepository],
    exports: [AuthService],
})
export class AuthModule {}
