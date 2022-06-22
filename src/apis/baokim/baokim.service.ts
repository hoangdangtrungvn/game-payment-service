import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { firstValueFrom } from 'rxjs'
import {
  CancelOrderRequest,
  CancelOrderResponse,
  ErrorCode,
  OrderDetailResponse,
  Response,
  SendOrderRequest,
  SendOrderResponse,
} from './types'

@Injectable()
export class BaoKimService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async bpmList() {
    return await this.get<object>('/bpm/list')
  }

  async sendOrder(form: SendOrderRequest) {
    return await this.post<SendOrderResponse>('/order/send', form)
  }

  async cancelOrder(form: CancelOrderRequest) {
    return await this.post<CancelOrderResponse>('/order/cancel', form)
  }

  async orderDetail(query: { id: number; mrc_order_id: string }) {
    return await this.get<OrderDetailResponse>('/order/detail', query)
  }

  async get<T>(uri: string, query: any = {}) {
    const jwt = this.jwtService.sign({})

    const res = await firstValueFrom(
      this.httpService.get(uri, {
        params: query,
        headers: { jwt: `Bearer ${jwt}` },
      }),
    ).catch((e) => {
      throw new HttpException(
        { message: 'Bao Kim error', error: e.response.data.message },
        e.response.status,
      )
    })

    const { code, count, data, message } = res.data as any as Response<T>

    if (code == 0) {
      return data
    }

    throw new HttpException(
      { message: message, error: ErrorCode[code] },
      HttpStatus.BAD_REQUEST,
    )
  }

  async post<T>(uri: string, form: any = {}, query: any = {}) {
    const jwt = this.jwtService.sign({ form_params: form })

    const res = await firstValueFrom(
      this.httpService.post(uri, form, {
        params: query,
        headers: {
          jwt: `Bearer ${jwt}`,
        },
      }),
    ).catch((e) => {
      throw new HttpException(
        { message: 'Bao Kim error', error: e.response.data.message },
        e.response.status,
      )
    })

    const { code, count, data, message } = res.data as any as Response<T>

    if (code == 0) {
      return data
    }

    throw new HttpException(
      { message: message, error: ErrorCode[code] },
      HttpStatus.BAD_REQUEST,
    )
  }
}
