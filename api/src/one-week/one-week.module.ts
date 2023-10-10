import { Module } from '@nestjs/common'
import { OneWeekService } from './one-week.service'
import { OneWeekController } from './one-week.controller'
import { GamesModule } from 'src/games/games.module'
import { OneWeekSearchService } from './one-week-search-service'
import { TwoWinTwoMac } from './one-week-patterns-service/two-win-two-mac'
import { TwoWinOneMac } from './one-week-patterns-service/two-win-one-mac'
import { OneWinOneMac } from './one-week-patterns-service/one-win-one-mac'
import { OneWinTwoMac } from './one-week-patterns-service/one-win-two-mac'

@Module({
  imports: [GamesModule.register()],
  controllers: [OneWeekController],
  providers: [OneWeekService, OneWeekSearchService, TwoWinTwoMac, TwoWinOneMac, OneWinOneMac, OneWinTwoMac],
})
export class OneWeekModule {}
