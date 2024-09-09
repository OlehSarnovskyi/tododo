import {Module} from '@nestjs/common'
import {UsersModule} from './users/users.module';
import {ConfigModule} from '@nestjs/config';
import * as Joi from 'joi'
import {DatabaseModule} from './shared/database.module';


@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
            })
        }),
        UsersModule
    ]
})
export class AppModule {}
