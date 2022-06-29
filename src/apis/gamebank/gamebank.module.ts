import { Module } from '@nestjs/common'
import { GameBankService } from './gamebank.service'

@Module({
  providers: [GameBankService],
  exports: [GameBankService],
})
export class GameBankModule {}
