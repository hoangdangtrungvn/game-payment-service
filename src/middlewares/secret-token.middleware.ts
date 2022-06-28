import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'

@Injectable()
export class SecretTokenMiddleware implements NestMiddleware {
  use(req, res, next) {
    const secretToken = req.headers['secret-token']

    if (!secretToken || secretToken !== process.env.SECRET_TOKEN) {
      throw new HttpException('Invalid secret token.', HttpStatus.BAD_REQUEST)
    }

    next()
  }
}
