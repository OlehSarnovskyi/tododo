import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { TelegramAuthService } from './telegram-auth.service';

const AUTH_SCHEME = 'tma ';

/**
 * Authenticates every request from the Telegram mini app by verifying the
 * signed initData sent as `Authorization: tma <initData>`, and attaches the
 * verified user to the request for controllers to consume.
 */
@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly telegramAuthService: TelegramAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header: string = request.headers?.authorization ?? '';
    const initData = header.startsWith(AUTH_SCHEME)
      ? header.slice(AUTH_SCHEME.length)
      : '';

    request.telegramUser = this.telegramAuthService.verify(initData);

    return true;
  }
}
