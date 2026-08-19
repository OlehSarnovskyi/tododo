import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { LoggingInterceptor } from './shared/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)

  // Vercel terminates TLS in front of the app, so without this every request
  // looks like it comes from the proxy and rate limiting would treat all
  // users as a single client.
  app.set('trust proxy', 1)

  app.enableCors({
    origin: configService
      .get<string>('CORS_ORIGINS')
      .split(',')
      .map((origin) => origin.trim()),
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalInterceptors(new LoggingInterceptor())

  await app.listen(configService.get<number>('PORT'))
}

bootstrap()
