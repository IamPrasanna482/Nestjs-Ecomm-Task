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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const user_repository_1 = require("./user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(userModel, UserRepository) {
        this.userModel = userModel;
        this.UserRepository = UserRepository;
    }
    async createUser(user) {
        const pw = user.password;
        const hashedPW = await bcrypt.hash(pw, 5);
        user.password = hashedPW;
        return await this.UserRepository.createUser(user);
    }
    async deleteUser(userId) {
        return await this.UserRepository.deleteUser(userId);
    }
    async getAllUsers(params) {
        const { full_name, email, gender, age, role, limit = 10, offset = 0, } = params;
        const queryOptions = {};
        if (role)
            queryOptions.role = role;
        if (full_name)
            queryOptions.full_name = full_name;
        if (email)
            queryOptions.email = email;
        if (gender)
            queryOptions.gender = gender;
        if (age)
            queryOptions.age = age;
        if (role)
            queryOptions.role = role;
        const users = await this.UserRepository.getAllUsersByParams(queryOptions, limit, offset, params.sortBy, params.order);
        return users;
    }
    async canGetAccess(token) {
        const decodedToken = jwt.verify(token, '2020b0101032');
        if (decodedToken.role != 'admin') {
            return false;
        }
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map