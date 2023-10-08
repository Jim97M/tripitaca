import { Injectable, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Implement rate limiting logic here using express-rate-limit
    rateLimit({
      windowMs: 60 * 1000, // 1 minute window
      max: 100, // max 100 requests per minute
      message: 'Too many requests from this IP, please try again later.',
    })(req, res, next); // Apply the rate limit middleware
  }
}