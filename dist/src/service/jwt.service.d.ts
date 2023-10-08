export declare class JwtService {
    private readonly secretKey;
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}
