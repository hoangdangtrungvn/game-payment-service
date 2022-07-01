import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaoKimService } from '@/apis/baokim/baokim.service'
import { Order } from '@/entities/order.entity'
import CreateOrderDto from './dto/create-order.dto'
import { PaymentGate } from '@/enums/payment-gate.enum'
import BaoKimPayloadDto from '@/apis/baokim/dto/baokim-payload.dto'
import GameBankPayloadDto from '@/apis/gamebank/dto/gamebank-payload.dto'
import { OrderStatus } from '@/enums/order-status.enum'
import { GameBankService } from '@/apis/gamebank/gamebank.service'
import { SendOrderRequest } from '@/apis/baokim/types'
import { CardChargingRequest } from '@/apis/gamebank/types'
import { firstValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import * as crypto from 'crypto'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly baokimService: BaoKimService,
    private readonly gameBankService: GameBankService,
    private readonly httpService: HttpService,
  ) {}

  async create(body: CreateOrderDto) {
    // Create order
    const order = this.orderRepository.create({
      user_id: body.user_id,
      game_id: body.game_id,
      paygate: body.payload.paygate,
      payload: body.payload,
      webhook: {},
    })
    await this.orderRepository.save(order)

    // Send to payment gateway
    try {
      if (body.payload.paygate === PaymentGate.BAOKIM) {
        return await this.sendBaoKim(order, order.payload as BaoKimPayloadDto)
      }

      if (body.payload.paygate === PaymentGate.GAMEBANK) {
        return await this.sendGameBank(
          order,
          order.payload as GameBankPayloadDto,
        )
      }
    } catch (error) {
      this.orderRepository.update(order.id, {
        status: OrderStatus.FAILED,
      })
      throw new HttpException(
        { message: error.response?.message, error: error.response?.error },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async sendBaoKim(order: Order, payload: BaoKimPayloadDto) {
    const form: SendOrderRequest = {
      mrc_order_id: order.id.toString(),
      total_amount: payload.total_amount,
      description: payload.description,
      merchant_id: +process.env.BAOKIM_API_MERCHANT_ID,
      bpm_id: payload?.bpm_id,
    }
    return await this.baokimService.sendOrder(form)
  }

  async sendGameBank(order: Order, payload: GameBankPayloadDto) {
    // Call GameBank API
    const form: CardChargingRequest = {
      merchant_id: +process.env.GAMEBANK_API_MERCHANT_ID,
      pin: payload.pin,
      seri: payload.seri,
      card_type: payload.card_type,
      price_guest: payload.price_guest,
      note: order.id.toString(),
    }
    await this.gameBankService.cardCharging(form)

    // Set order status to paygate success
    await this.orderRepository.update(order.id, {
      status: OrderStatus.PAYGATE,
    })

    // Callback to game service
    const data = {
      user_id: order.user_id,
      game_id: order.game_id,
      payload,
    }
    const sign = await this.hashData(data)
    const resp = await firstValueFrom(
      this.httpService.post(payload.callback_url, { ...data, sign }),
    )

    if (resp.data.err_code !== 0) {
      throw new HttpException(
        { message: resp.data.message, error: resp.data.err_code },
        HttpStatus.BAD_REQUEST,
      )
    }

    // Set order status to success completed
    await this.orderRepository.update(order.id, {
      status: OrderStatus.SUCCESS,
    })

    return {
      message: 'Recharge successfully',
    }
  }

  async hashData(data: Record<string, any>) {
    const hmac = crypto.createHmac('sha256', process.env.SECRET_TOKEN)
    hmac.update(JSON.stringify(data))
    return hmac.digest('hex')
  }
}
