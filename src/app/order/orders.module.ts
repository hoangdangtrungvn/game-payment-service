import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaoKimModule } from '@/apis/baokim/baokim.module'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { Order } from '@/entities/order.entity'
import { GameBankModule } from '@/apis/gamebank/gamebank.module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: +process.env.HTTP_TIMEOUT,
        maxRedirects: +process.env.HTTP_MAX_REDIRECTS,
      }),
    }),
    TypeOrmModule.forFeature([Order]),
    BaoKimModule,
    GameBankModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
