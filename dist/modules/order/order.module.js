"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const order_model_1 = require("./order.model");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const order_repository_1 = require("./order.repository");
const user_module_1 = require("../user/user.module");
const order_product_module_1 = require("../common/order-product.module");
const product_module_1 = require("../product/product.module");
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const order_product_model_1 = require("../common/order-product.model");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([order_model_1.Order, product_model_1.Product, user_model_1.User, order_product_model_1.OrderProduct]),
            user_module_1.UserModule,
            order_product_module_1.OrderProductModule,
            product_module_1.ProductModule,
            product_model_1.Product,
            user_model_1.User,
            order_product_model_1.OrderProduct,
        ],
        providers: [order_service_1.OrderService, order_repository_1.OrderRepository],
        controllers: [order_controller_1.OrderController],
        exports: [order_service_1.OrderService, order_repository_1.OrderRepository],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map