import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRevocationService {
  private revokedTokens: Set<string> = new Set();

  revokeToken(token: string): void {
    this.revokedTokens.add(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.has(token);
  }
}