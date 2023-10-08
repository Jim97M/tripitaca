import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '../service/jwt.service';
import { UserService } from 'src/service/user.service';
import RequestWithUser from 'src/types/custom-types';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    use(req: RequestWithUser, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
