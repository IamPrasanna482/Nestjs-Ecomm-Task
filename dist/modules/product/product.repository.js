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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const product_model_1 = require("./product.model");
const user_repository_1 = require("../user/user.repository");
let ProductRepository = class ProductRepository {
    constructor(userModel, userRepository) {
        this.userModel = userModel;
        this.userRepository = userRepository;
    }
    async createProduct(product) {
        return await product_model_1.Product.create(product);
    }
    async getAllProducts(page, limit, queryParams) {
        return await product_model_1.Product.findAndCountAll({
            offset: (page - 1) * limit,
            limit,
            where: {
                rating: queryParams.rating
            }
        });
    }
    async updateProduct(id, updateProductDto) {
        const product = await product_model_1.Product.findByPk(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const { user_id } = updateProductDto;
        if (product.user_id != user_id) {
            throw new common_1.UnauthorizedException('Only the owner can update the product !');
        }
        return product.update(updateProductDto);
    }
    async deleteProduct(id) {
        const result = await product_model_1.Product.destroy({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Product not found');
        }
    }
    async findProduct(id) {
        return product_model_1.Product.findByPk(id);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object, user_repository_1.UserRepository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map