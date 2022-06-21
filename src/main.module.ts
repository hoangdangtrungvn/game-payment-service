import { Module } from '@nestjs/common'
import { ConfigModules } from './configs'
import { AppModules } from './app'

@Module({
  imports: [...ConfigModules, ...AppModules],
  providers: [],
})
export class MainModule {}
