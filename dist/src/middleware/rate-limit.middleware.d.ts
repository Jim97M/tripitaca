import { NestMiddleware } from '@nestjs/common';
export declare class RateLimitMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
