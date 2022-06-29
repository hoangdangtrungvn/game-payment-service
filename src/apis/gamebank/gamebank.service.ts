import AxiosDigestAuth from '@mhoc/axios-digest-auth/dist'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CardChargingRequest } from './types'

@Injectable()
export class GameBankService {
  async cardCharging(form: CardChargingRequest) {
    const auth = new AxiosDigestAuth({
      username: process.env.GAMEBANK_API_USER,
      password: process.env.GAMEBANK_API_PASSWORD,
    })

    const res = await auth
      .request({
        timeout: +process.env.HTTP_TIMEOUT,
        maxRedirects: +process.env.HTTP_MAX_REDIRECTS,
        method: 'POST',
        url: process.env.GAMEBANK_API_URL,
        data: form,
      })
      .catch((e) => {
        throw new HttpException(
          { message: `GameBank: ${e.response.data.msg}` },
          e.response.status,
        )
      })

    const { code, info_card, msg } = res.data

    if (code == 0) {
      return res.data
    }

    throw new HttpException(
      { message: `GameBank: ${msg}` },
      HttpStatus.BAD_REQUEST,
    )
  }
}
