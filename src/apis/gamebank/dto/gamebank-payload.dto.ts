import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import OrderPayloadDto from '@/app/order/dto/order-payload.dto'
import { CardType } from '../enums/card-type.enum'
import { PriceGuest } from '../enums/price-guest.enum'

export default class GameBankPayloadDto extends OrderPayloadDto {
  @IsString()
  @IsNotEmpty()
  pin: string

  @IsString()
  @IsNotEmpty()
  seri: string

  @IsEnum(CardType)
  @IsNotEmpty()
  card_type: CardType

  @IsEnum(PriceGuest)
  @IsNotEmpty()
  price_guest: PriceGuest

  @IsOptional()
  meta: any
}
