import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PayloadOneWeekDto } from './dto/payload-one-week.dto'
import { PatternFns } from 'src/games/utils/types'
import { GroupSelectionService } from 'src/games/group-selection.service'
import { TwoWinTwoMac } from './one-week-patterns-service/two-win-two-mac'
import { OneWinTwoMac } from './one-week-patterns-service/one-win-two-mac'
import { TwoWinOneMac } from './one-week-patterns-service/two-win-one-mac'
import { OneWinOneMac } from './one-week-patterns-service/one-win-one-mac'

@Injectable()
export class OneWeekService {
  constructor(private readonly groupSelectionService: GroupSelectionService, private readonly twoWinTwoMac: TwoWinTwoMac, private readonly oneWinTwoMac: OneWinTwoMac, private readonly twoWinOneMac: TwoWinOneMac, private readonly oneWinOneMac: OneWinOneMac) {}
  async search(payload: PayloadOneWeekDto) {
    const pattern = payload.pattern
    let patternFns: PatternFns

    switch (pattern) {
      case 'TwoWinTwoMac':
        patternFns = this.twoWinTwoMac
        break
      case 'TwoWinOneMac':
        patternFns = this.twoWinOneMac
        break
      case 'OneWinTwoMac':
        patternFns = this.oneWinTwoMac
        break
      case 'OneWinOneMac':
        patternFns = this.oneWinOneMac
        break
      default:
        throw new HttpException('Invalid one-week-search pattern', HttpStatus.BAD_REQUEST)
    }

    const result = this.groupSelectionService.search(payload, patternFns)
    return result
  }
}
