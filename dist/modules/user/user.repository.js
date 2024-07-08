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
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("../product/product.model");
let UserRepository = class UserRepository {
    constructor(userModel, sequelize) {
        this.userModel = userModel;
        this.sequelize = sequelize;
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
        const transaction = await this.sequelize.transaction();
        let isCommitted = false;
        try {
            const user = await user_model_1.User.findByPk(userId);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            await user_model_1.User.destroy({
                where: { user_id: userId },
            });
            await product_model_1.Product.destroy({
                where: {
                    user_id: userId,
                }
            });
            await transaction.commit();
            isCommitted = true;
            throw new common_1.HttpException('User deleted successfully along with its corresponding products', common_1.HttpStatus.OK);
        }
        catch (error) {
            if (!isCommitted) {
                await transaction.rollback();
            }
        }
        throw new common_1.HttpException('Error occured, could not delete order', common_1.HttpStatus.BAD_REQUEST);
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
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize])
], UserRepository);
//# sourceMappingURL=user.repository.js.map