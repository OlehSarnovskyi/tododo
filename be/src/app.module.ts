import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import * as Joi from 'joi'

import {UsersModule} from './users/users.module';
import {DatabaseModule} from './shared/database.module';
import {CryptoModule} from './shared/crypto.module';
import {TelegramAuthModule} from './shared/telegram-auth.module';
import {TelegramAuthGuard} from './shared/telegram-auth.guard';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                BOT_TOKEN: Joi.string().required(),
                ENCRYPTION_KEY: Joi.string().length(64).hex().required(),
                PORT: Joi.number().default(3001),
                CORS_ORIGINS: Joi.string().default(
                    'https://tododo-web-app.vercel.app,http://localhost:3000',
                ),
                // How long a Telegram launch stays valid — limits replay of
                // captured initData. Defaults to 24h.
                INIT_DATA_MAX_AGE_SECONDS: Joi.number().default(86400),
                THROTTLE_TTL_SECONDS: Joi.number().default(60),
                THROTTLE_LIMIT: Joi.number().default(60),
            })
        }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ([{
                ttl: config.get<number>('THROTTLE_TTL_SECONDS') * 1000,
                limit: config.get<number>('THROTTLE_LIMIT'),
            }]),
        }),
        CryptoModule,
        TelegramAuthModule,
        DatabaseModule,
        UsersModule
    ],
    providers: [
        // Order matters: throttle first, so a flood of unauthenticated requests
        // is rejected by rate limit rather than sailing past it into a 401.
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        // Every request must carry verified Telegram initData.
        { provide: APP_GUARD, useClass: TelegramAuthGuard },
    ]
})
export class AppModule {}
