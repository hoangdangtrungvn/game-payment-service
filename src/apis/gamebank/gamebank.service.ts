import AxiosDigestAuth from '@mhoc/axios-digest-auth/dist'
import { Injectable } from '@nestjs/common'
import { CardChargingRequest } from './types'

@Injectable()
export class GameBankService {
  async cardCharging(form: CardChargingRequest) {
    const data = new URLSearchParams()
    data.append('merchant_id', form.merchant_id.toString())
    data.append('card_type', form.card_type.toString())
    data.append('price_guest', form.price_guest.toString())
    data.append('pin', form.pin)
    data.append('seri', form.seri)
    data.append('note', form.note)

    const auth = new AxiosDigestAuth({
      username: process.env.GAMEBANK_API_USER,
      password: process.env.GAMEBANK_API_PASSWORD,
    })

    const res = await auth.request({
      timeout: +process.env.HTTP_TIMEOUT,
      maxRedirects: +process.env.HTTP_MAX_REDIRECTS,
      method: 'POST',
      url: process.env.GAMEBANK_API_URL,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return res.data
  }
}
