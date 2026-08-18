import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { TelegramAuthService } from './telegram-auth.service';

const BOT_TOKEN = 'test-bot-token';
const MAX_AGE = 86400;

function createService(): TelegramAuthService {
  const config = {
    get: (key: string) => (key === 'BOT_TOKEN' ? BOT_TOKEN : MAX_AGE),
  } as unknown as ConfigService;

  return new TelegramAuthService(config);
}

/** Builds initData signed the way Telegram signs it. */
function signInitData(user: object, authDate = Math.floor(Date.now() / 1000)): string {
  const params = new URLSearchParams({
    auth_date: String(authDate),
    user: JSON.stringify(user),
  });

  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
  params.set('hash', crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex'));

  return params.toString();
}

describe('TelegramAuthService', () => {
  const user = { id: 42, first_name: 'Oleh', username: 'oleh', language_code: 'uk' };

  it('accepts correctly signed initData and returns the user', () => {
    expect(createService().verify(signInitData(user))).toMatchObject({ id: 42, username: 'oleh' });
  });

  it('rejects initData whose payload was altered after signing', () => {
    // Swap in a different user id while keeping the original signature —
    // this is exactly the forgery the check has to catch.
    const params = new URLSearchParams(signInitData(user));
    params.set('user', JSON.stringify({ ...user, id: 999 }));

    expect(() => createService().verify(params.toString())).toThrow(/Invalid/);
  });

  it('rejects initData signed with another bot token', () => {
    const params = new URLSearchParams(signInitData(user));
    params.set('hash', crypto.randomBytes(32).toString('hex'));

    expect(() => createService().verify(params.toString())).toThrow();
  });

  it('rejects initData older than the allowed window', () => {
    const stale = signInitData(user, Math.floor(Date.now() / 1000) - MAX_AGE - 60);

    expect(() => createService().verify(stale)).toThrow(/expired/);
  });

  it('rejects a missing or empty header', () => {
    expect(() => createService().verify('')).toThrow();
  });
});
