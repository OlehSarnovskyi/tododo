import {Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {UsersRepository} from "./users.repository";
import { UserDocument, UserSchema } from './models/user.schema';
import { DatabaseModule } from '../shared/database.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{name: UserDocument.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
