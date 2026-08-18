import * as crypto from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username: string;
  language_code: string;
}

/**
 * Verifies Telegram WebApp initData.
 *
 * Telegram signs the launch parameters with a key derived from the bot token,
 * so a valid signature proves the caller really is the Telegram user named
 * inside it. Identity is always taken from here — never from client-supplied
 * request fields, which anyone could forge.
 *
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
@Injectable()
export class TelegramAuthService {
  private readonly secretKey: Buffer;
  private readonly maxAgeSeconds: number;

  constructor(configService: ConfigService) {
    this.secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(configService.get<string>('BOT_TOKEN'))
      .digest();
    this.maxAgeSeconds = configService.get<number>('INIT_DATA_MAX_AGE_SECONDS');
  }

  verify(initData: string): TelegramUser {
    if (!initData) {
      throw new UnauthorizedException('Missing Telegram initData.');
    }

    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) {
      throw new UnauthorizedException('Missing initData hash.');
    }

    params.delete('hash');

    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const expectedHash = crypto
      .createHmac('sha256', this.secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (!this.isEqual(expectedHash, hash)) {
      throw new UnauthorizedException('Invalid Telegram initData.');
    }

    this.assertNotExpired(params.get('auth_date'));

    return this.parseUser(params.get('user'));
  }

  private assertNotExpired(authDate: string | null): void {
    const issuedAt = Number(authDate);
    if (!Number.isFinite(issuedAt)) {
      throw new UnauthorizedException('Missing initData auth_date.');
    }

    const ageSeconds = Date.now() / 1000 - issuedAt;
    if (ageSeconds > this.maxAgeSeconds) {
      throw new UnauthorizedException('Telegram initData has expired.');
    }
  }

  private parseUser(rawUser: string | null): TelegramUser {
    if (!rawUser) {
      throw new UnauthorizedException('Missing Telegram user.');
    }

    let user: TelegramUser;
    try {
      user = JSON.parse(rawUser);
    } catch {
      throw new UnauthorizedException('Malformed Telegram user.');
    }

    if (typeof user?.id !== 'number') {
      throw new UnauthorizedException('Malformed Telegram user.');
    }

    return user;
  }

  /** Constant-time comparison, so a wrong hash cannot be found byte by byte. */
  private isEqual(expected: string, received: string): boolean {
    const expectedBuffer = Buffer.from(expected, 'utf8');
    const receivedBuffer = Buffer.from(received, 'utf8');

    return (
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    );
  }
}
