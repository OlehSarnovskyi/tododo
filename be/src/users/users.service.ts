import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { TelegramUser } from '../shared/telegram-auth.service';

@Injectable()
export class UsersService implements OnModuleInit {
    private readonly logger = new Logger(UsersService.name);

    constructor(private readonly usersRepository: UsersRepository) {}

    async onModuleInit(): Promise<void> {
        try {
            await this.usersRepository.encryptLegacyProfiles();
        } catch (error) {
            // A failed migration must not stop the app from serving requests.
            this.logger.error(`Profile encryption migration failed: ${error.message}`);
        }
    }

    /**
     * Registers a first-time visitor. The profile comes from initData that the
     * guard already verified, so it is trusted here.
     */
    async login(user: TelegramUser): Promise<{ created: boolean }> {
        if (await this.usersRepository.exists(user.id)) {
            return { created: false };
        }

        await this.usersRepository.create(user);

        return { created: true };
    }
}
