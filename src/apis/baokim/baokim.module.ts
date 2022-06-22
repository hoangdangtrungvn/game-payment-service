import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { BaoKimService } from './baokim.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.BAOKIM_API_SECRET,
      signOptions: {
        issuer: process.env.BAOKIM_API_KEY,
        algorithm: 'HS256',
        expiresIn: 60,
      },
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: +process.env.HTTP_TIMEOUT,
        maxRedirects: +process.env.HTTP_MAX_REDIRECTS,
        baseURL: process.env.BAOKIM_API_URL,
      }),
    }),
  ],
  providers: [BaoKimService],
  exports: [BaoKimService],
})
export class BaoKimModule {}
