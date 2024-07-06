"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const user_model_1 = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_repository_1 = require("../user/user.repository");
let AuthService = class AuthService {
    constructor(userService, UserRepository) {
        this.userService = userService;
        this.UserRepository = UserRepository;
    }
    async login(email, password, role) {
        const existingUser = await user_model_1.User.findOne({ where: { email: email } });
        if (!existingUser) {
            throw new common_1.HttpException('Email ID is not registered !', common_1.HttpStatus.BAD_REQUEST);
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            throw new common_1.HttpException('Please enter correct password !', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = jwt.sign({
            email: email,
            password: password,
            role: role,
        }, '2020b0101032');
        return {
            msg: `user with email ${email} is successfully logged in using the token!`,
            token: `${token}`,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_repository_1.UserRepository])
], AuthService);
module.exports = { AuthService };
//# sourceMappingURL=auth.service.js.map