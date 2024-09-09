import {Injectable} from '@nestjs/common'

import {UsersRepository} from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // async create(createUserDto: CreateUserDto) {
  // }

  // findOne() {
  //   return this.usersRepository.find(query, ranges)
  // }
}
