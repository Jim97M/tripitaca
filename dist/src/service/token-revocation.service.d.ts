export declare class TokenRevocationService {
    private revokedTokens;
    revokeToken(token: string): void;
    isTokenRevoked(token: string): boolean;
}
