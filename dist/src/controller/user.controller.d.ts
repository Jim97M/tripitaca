import { User } from "../models/user.schema";
import { UserService } from "../service/user.service";
import { JwtService } from "../service/jwt.service";
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    Signup(response: any, user: User): Promise<any>;
    SignIn(response: any, user: User): Promise<any>;
    Logout(token: string, response: any): Promise<any>;
}
