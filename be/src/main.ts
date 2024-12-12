import {NestFactory} from '@nestjs/core'
import {ValidationPipe} from '@nestjs/common'

import {AppModule} from './app.module'
import {LoggingInterceptor} from "./shared/logging.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['https://tododo-web-app.vercel.app', 'http://localhost:3000'],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen('3001')
}
bootstrap()
