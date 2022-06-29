import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaoKimModule } from '@/apis/baokim/baokim.module'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { Order } from '@/entities/order.entity'
import { SecretTokenMiddleware } from '@/middlewares/secret-token.middleware'
import { GameBankModule } from '@/apis/gamebank/gamebank.module'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), BaoKimModule, GameBankModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecretTokenMiddleware)
      .forRoutes({ path: 'orders', method: RequestMethod.POST })
  }
}
