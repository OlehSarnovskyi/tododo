import * as crypto from 'crypto';
import {Injectable, UnauthorizedException, UnprocessableEntityException} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'

import {UsersRepository} from './users.repository'
import {CreateUserDto} from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService,
    ) {}

    async login(userDto: CreateUserDto): Promise<string> {
        this.verifyTelegramInitData(userDto.initData);
        const exists = await this.validateLogin(userDto.id);
        if (!exists) {
            await this.usersRepository.create(userDto);
            return 'Welcome to Tododo!';
        }
    }

    private verifyTelegramInitData(initData: string): void {
        const botToken = this.configService.get<string>('BOT_TOKEN');
        const params = new URLSearchParams(initData);
        const hash = params.get('hash');
        if (!hash) throw new UnauthorizedException('Missing hash');
        params.delete('hash');

        const dataCheckString = Array.from(params.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
        const expectedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

        if (expectedHash !== hash) {
            throw new UnauthorizedException('Invalid Telegram initData');
        }
    }

    private async validateLogin(id: number) {
        try {
            await this.usersRepository.findOne(id);
            return true;
        } catch (error) {
            if (error.status && error.status !== 404) {
                throw new UnprocessableEntityException('');
            }
        }
        return false;
    }
}
