import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  success: boolean
  message: string
  data: T
  status: number
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        context
          .switchToHttp()
          .getResponse()
          .status(data.status ?? 200)
        return {
          success: true,
          message: data.message,
          data: data.data ?? data,
          status: context.switchToHttp().getResponse().statusCode,
        }
      }),
    )
  }
}
