import {Injectable, UnprocessableEntityException} from '@nestjs/common'

import {UsersRepository} from './users.repository'
import {CreateUserDto} from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {
    }

    async login(userDto: CreateUserDto): Promise<string> {
        const exists = await this.validateLogin(userDto.id)
        if (!exists) {
            return await this.usersRepository.create(userDto)
        }
        return await 'Logged in'
    }

    private async validateLogin(id: number) {
        try {
            await this.usersRepository.findOne(id)
            return true
        } catch (error) {
            if (error.status && error.status !== 404) {
                throw new UnprocessableEntityException('')
            }
        }
        return false
    }
}
