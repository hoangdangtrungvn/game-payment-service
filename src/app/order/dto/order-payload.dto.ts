import { PaymentGate } from '@/enums/payment-gate.enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export default class OrderPayloadDto {
  @IsString()
  @IsNotEmpty()
  callback_url: string

  @IsEnum(PaymentGate)
  @IsNotEmpty()
  paygate: PaymentGate

  @IsOptional()
  meta: any
}
