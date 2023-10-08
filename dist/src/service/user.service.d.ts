import { Model } from "mongoose";
import { User, UserDocument } from "../models/user.schema";
import { JwtService } from "./jwt.service";
import { TokenRevocationService } from './token-revocation.service';
export declare class UserService {
    private userModel;
    private jwtService;
    private tokenRevocationService;
    private blacklistedTokens;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, tokenRevocationService: TokenRevocationService);
    signup(user: User): Promise<User>;
    signin(user: User): Promise<any>;
    getOne(email: any): Promise<User>;
    isTokenBlacklisted(token: string): Promise<boolean>;
    logout(token: string): Promise<void>;
}
