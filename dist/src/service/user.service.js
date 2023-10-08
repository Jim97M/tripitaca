"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../models/user.schema");
const bcrypt = __importStar(require("bcrypt"));
const jwt_service_1 = require("./jwt.service");
const token_revocation_service_1 = require("./token-revocation.service");
let UserService = class UserService {
    constructor(userModel, jwtService, tokenRevocationService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.tokenRevocationService = tokenRevocationService;
        this.blacklistedTokens = [];
    }
    async signup(user) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            fullname: user.fullname,
            email: user.email,
            password: hash
        };
        const newUser = new this.userModel(reqBody);
        return newUser.save();
    }
    async signin(user) {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        if (foundUser) {
            const { password } = foundUser;
            if (await bcrypt.compare(user.password, password)) {
                const payload = { email: user.email };
                const token = this.jwtService.generateToken(payload);
                return {
                    token,
                };
            }
            return new common_1.HttpException('Incorrect username or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        return new common_1.HttpException('Incorrect username or password', common_1.HttpStatus.UNAUTHORIZED);
    }
    async getOne(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async isTokenBlacklisted(token) {
        return this.blacklistedTokens.includes(token);
    }
    async logout(token) {
        if (this.tokenRevocationService.isTokenRevoked(token)) {
            throw new common_1.HttpException('Token has already been revoked', common_1.HttpStatus.BAD_REQUEST);
        }
        this.tokenRevocationService.revokeToken(token);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_service_1.JwtService,
        token_revocation_service_1.TokenRevocationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map