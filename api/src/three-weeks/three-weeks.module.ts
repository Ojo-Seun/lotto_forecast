import { Module } from '@nestjs/common'
import { ThreeWeeksController } from './three-weeks.controller'
import { GamesModule } from 'src/games/games.module'
import { ThreeWeeksService } from './three-weeks.service'
import { ThreeWeeksSearchService } from './three-weeks-search.service'
import { TwoCloseOneTwoCloseAny } from './threeWeeksPatternsService/twoCloseOneTwoCloseAny'
import { TwoCloseTwoCloseOneAny } from './threeWeeksPatternsService/twoCloseTwoClosOneAny'
import { TwoOneTwoAny } from './threeWeeksPatternsService/twoOneTwoAny'
import { TwoPosOneAnyTwoAny } from './threeWeeksPatternsService/twoPosOneAnyTwoAny'
import { TwoPosOneAnyTwoCloseAny } from './threeWeeksPatternsService/twoPosOneAnyTwoCloseAny'
import { TwoPosTwoAnyOneAny } from './threeWeeksPatternsService/twoPosTwoAnyOneAny'
import { TwoPosTwoCloseOneAny } from './threeWeeksPatternsService/twoPosTwoCloseOneAny'
import { TwoTwoOneAny } from './threeWeeksPatternsService/twoTwoOneAny'
import { TwoTwoTwoAny } from './threeWeeksPatternsService/twoTwoTwoAny'
import { TwoTwoTwoPos } from './threeWeeksPatternsService/twoTwoTwoPos'
import { threeWeeksSeachFns } from './threeWeeksSearchFns'
import { TwoOneOnePos } from './threeWeeksPatternsService/two-one-one-pos'

@Module({
  imports: [GamesModule.register(threeWeeksSeachFns)],
  controllers: [ThreeWeeksController],
  providers: [ThreeWeeksService, TwoOneOnePos, ThreeWeeksSearchService, TwoCloseOneTwoCloseAny, TwoCloseTwoCloseOneAny, TwoOneTwoAny, TwoPosOneAnyTwoAny, TwoPosOneAnyTwoCloseAny, TwoPosTwoAnyOneAny, TwoPosTwoCloseOneAny, TwoTwoOneAny, TwoTwoTwoAny, TwoTwoTwoPos],
})
export class ThreeWeeksModule {}
