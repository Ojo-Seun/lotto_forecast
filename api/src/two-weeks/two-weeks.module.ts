import { Module } from '@nestjs/common'
import { TwoWeeksService } from './two-weeks.service'
import { TwoWeeksController } from './two-weeks.controller'
import { GamesModule } from 'src/games/games.module'
import { TwoWeeksSearchService } from './two-weeks-search.service'
import { TwoCloseTwoClose } from './two-weeks-pattern-service/twoCloseTwoClose'
import { TwoCloseTwoClosePos } from './two-weeks-pattern-service/twoCloseTwoClosePos'
import { TwoCloseTwoAny } from './two-weeks-pattern-service/twoCloseTwoAny'
import { twoWeeksSearchFns } from './twoWeeksSearchFns'
import { TwoPosTwoPos } from './two-weeks-pattern-service/twoPosTwoPos'
import { TwoPosOnePos } from './two-weeks-pattern-service/twoPosOnePos'
import { TwoCloseTwoPos } from './two-weeks-pattern-service/twoCloseTwoPos'

@Module({
  imports: [GamesModule.register(twoWeeksSearchFns)],
  controllers: [TwoWeeksController],
  providers: [TwoWeeksService, TwoWeeksSearchService, TwoCloseTwoClose, TwoPosTwoPos, TwoCloseTwoClosePos, TwoPosOnePos, TwoCloseTwoPos, TwoCloseTwoAny],
})
export class TwoWeeksModule {}
