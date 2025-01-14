"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitMiddleware = void 0;
const common_1 = require("@nestjs/common");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
let RateLimitMiddleware = class RateLimitMiddleware {
    use(req, res, next) {
        (0, express_rate_limit_1.default)({
            windowMs: 60 * 1000,
            max: 100,
            message: 'Too many requests from this IP, please try again later.',
        })(req, res, next);
    }
};
RateLimitMiddleware = __decorate([
    (0, common_1.Injectable)()
], RateLimitMiddleware);
exports.RateLimitMiddleware = RateLimitMiddleware;
//# sourceMappingURL=rate-limit.middleware.js.map