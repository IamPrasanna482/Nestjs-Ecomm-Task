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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const product_model_1 = require("./product.model");
const product_repository_1 = require("./product.repository");
const user_repository_1 = require("../user/user.repository");
const user_model_1 = require("../user/user.model");
let ProductService = class ProductService {
    constructor(productModel, productRepository, userRepository, userModel) {
        this.productModel = productModel;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.userModel = userModel;
    }
    async canPostProduct(user_id) {
        const user = await this.userRepository.findByPk(user_id);
        return user && user.role === 'seller';
    }
    async createProduct(productInfo) {
        return this.productRepository.createProduct(productInfo);
    }
    async findAll(queryParams) {
        const { rating, price, name, stock, limit = 10, offset = 0 } = queryParams;
        const queryOptions = {};
        if (rating)
            queryOptions.rating = rating;
        if (price)
            queryOptions.price = price;
        if (name)
            queryOptions.name = name;
        if (stock)
            queryOptions.stock = stock;
        return this.productRepository.getAllProducts(queryOptions, limit, offset);
    }
    async findOne(id) {
        const product = await this.productRepository.findProduct(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async update(id, updateProductDto) {
        return this.productRepository.updateProduct(id, updateProductDto);
    }
    async remove(id) {
        const product = await this.productRepository.deleteProduct(id);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(3, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, product_repository_1.ProductRepository,
        user_repository_1.UserRepository, Object])
], ProductService);
//# sourceMappingURL=product.service.js.map