import { Controller, Post } from '@nestjs/common'

import { UsersService } from './users.service'
import { CurrentUser } from '../shared/telegram-user.decorator'
import { TelegramUser } from '../shared/telegram-auth.service'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('login')
    async loginUser(@CurrentUser() user: TelegramUser): Promise<{ created: boolean }> {
        return this.userService.login(user)
    }
}
