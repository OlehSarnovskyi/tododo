import { Global, Module } from '@nestjs/common';
import { TelegramAuthService } from './telegram-auth.service';

@Global()
@Module({
  providers: [TelegramAuthService],
  exports: [TelegramAuthService],
})
export class TelegramAuthModule {}
