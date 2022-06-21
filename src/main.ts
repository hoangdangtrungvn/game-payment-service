import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ExceptionFactory } from './validations/exception-factory'
import { MainModule } from './main.module'
import { TransformInterceptor } from './interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)

  // Prefix
  app.setGlobalPrefix('v1')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: false,
      exceptionFactory: ExceptionFactory,
      whitelist: true,
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  // Enable CORS by whitelist origin
  app.enableCors({
    origin: (origin, callback) => {
      if (process.env.CORS_WHITELIST_ORIGINS.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
  })

  // Use helmet
  app.use(helmet())

  await app.listen(process.env.PORT || 5001)
}

bootstrap()
