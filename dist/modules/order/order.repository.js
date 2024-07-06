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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const order_product_model_1 = require("../common/order-product.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let OrderRepository = class OrderRepository {
    constructor(orderModel, productModel, userModel, orderProductModel, sequelize) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.userModel = userModel;
        this.orderProductModel = orderProductModel;
        this.sequelize = sequelize;
    }
    async createOrder(orderDto) {
        let transaction;
        try {
            transaction = await this.sequelize.transaction();
            const { products } = orderDto;
            let totalAmount = 0;
            for (const product of products) {
                const { product_id, quantity } = product;
                const price = (await this.productModel.findByPk(product_id)).price;
                totalAmount += price * quantity;
            }
            const order = await this.orderModel.create({
                order_date: new Date(),
                total_amount: totalAmount,
                status: 'Pending',
                shipping_address: orderDto.address,
                customer_id: orderDto.customer_id,
            }, { transaction });
            for (const product of products) {
                await this.orderProductModel.create({
                    order_id: order.id,
                    product_id: product.product_id,
                }, { transaction });
            }
            await transaction.commit();
            return order;
        }
        catch (error) {
            if (transaction)
                await transaction.rollback();
            throw error;
        }
    }
    async findAllOrders(params) {
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(order_model_1.Order)),
    __param(1, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(2, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(order_product_model_1.OrderProduct)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, sequelize_typescript_1.Sequelize])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map