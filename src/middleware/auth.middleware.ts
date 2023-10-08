import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../service/jwt.service'; 
import { UserService } from 'src/service/user.service';
import RequestWithUser from 'src/types/custom-types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await this.userService.isTokenBlacklisted(token);

    if (isBlacklisted) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token is blacklisted' });
    }

    try {
      const payload = this.jwtService.verifyToken(token);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
  }
}
