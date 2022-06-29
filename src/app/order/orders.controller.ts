import { Body, Controller, Get, Post } from '@nestjs/common'
import CreateOrderDto from './dto/create-order.dto'
import { OrdersService } from './orders.service'

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body)
  }
}
