import BaoKimPayloadDto from '@/apis/baokim/dto/baokim-payload.dto'
import GameBankPayloadDto from '@/apis/gamebank/dto/gamebank-payload.dto'
import { PaymentGate } from '@/enums/payment-gate.enum'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'
import OrderPayloadDto from './order-payload.dto'

export default class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number

  @IsNumber()
  @IsNotEmpty()
  game_id: number

  @ValidateNested()
  @Type(() => OrderPayloadDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'paygate',
      subTypes: [
        { value: BaoKimPayloadDto, name: PaymentGate.BAOKIM },
        { value: GameBankPayloadDto, name: PaymentGate.GAMEBANK },
      ],
    },
  })
  @IsNotEmpty()
  payload: BaoKimPayloadDto | GameBankPayloadDto
}
