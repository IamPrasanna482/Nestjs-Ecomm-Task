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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const user = await this.userModel.create(createUserDto);
        return {
            msg: 'User successfully created',
            data: {
                name: user.full_name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async findByPk(userId) {
        return await this.userModel.findByPk(userId);
    }
    async deleteUser(userId) {
        await this.userModel.destroy({ where: { user_id: userId } });
        return { msg: 'user deleted successfully' };
    }
    async findbyEmail(email) {
        return await this.userModel.findAll({
            where: {
                email: email,
            },
        });
    }
    async getAllUsersByParams(queryOptions, limit, offset, sortBy = 'user_id', order = 'ASC') {
        const users = await user_model_1.User.findAll({
            where: queryOptions,
            limit: limit,
            offset: offset,
            order: [[sortBy, order]],
        });
        return users;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map