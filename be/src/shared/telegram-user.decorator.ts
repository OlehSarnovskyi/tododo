import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TelegramUser } from './telegram-auth.service';

/** The Telegram user proven by the verified initData signature. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TelegramUser =>
    context.switchToHttp().getRequest().telegramUser,
);

/** Shorthand for the verified Telegram user id. */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): number =>
    context.switchToHttp().getRequest().telegramUser.id,
);
