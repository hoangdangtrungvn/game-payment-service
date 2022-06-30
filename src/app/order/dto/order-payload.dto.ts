import { PaymentGate } from '@/enums/payment-gate.enum'
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator'

export default class OrderPayloadDto {
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  callback_url: string

  @IsEnum(PaymentGate)
  @IsNotEmpty()
  paygate: PaymentGate
}
