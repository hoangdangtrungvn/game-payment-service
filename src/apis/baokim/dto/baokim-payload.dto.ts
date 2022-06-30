import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import OrderPayloadDto from '@/app/order/dto/order-payload.dto'

export default class BaoKimPayloadDto extends OrderPayloadDto {
  @IsPositive()
  @IsNotEmpty()
  total_amount: number

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsOptional()
  bpm_id: number

  @IsOptional()
  meta: any
}
