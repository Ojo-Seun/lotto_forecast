import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { GroupSelectionService } from 'src/games/group-selection.service'
import { TwoCloseOneTwoCloseAny } from './threeWeeksPatternsService/twoCloseOneTwoCloseAny'
import { ThreeWeeksPayload } from './interface/types'
import { PayloadService } from 'src/global-utils/payload.service'
import { TwoCloseTwoCloseOneAny } from './threeWeeksPatternsService/twoCloseTwoClosOneAny'
import { PatternFns } from 'src/games/utils/types'
import { TwoOneTwoAny } from './threeWeeksPatternsService/twoOneTwoAny'
import { TwoPosOneAnyTwoAny } from './threeWeeksPatternsService/twoPosOneAnyTwoAny'
import { TwoPosOneAnyTwoCloseAny } from './threeWeeksPatternsService/twoPosOneAnyTwoCloseAny'
import { TwoPosTwoAnyOneAny } from './threeWeeksPatternsService/twoPosTwoAnyOneAny'
import { TwoPosTwoCloseOneAny } from './threeWeeksPatternsService/twoPosTwoCloseOneAny'
import { TwoTwoOneAny } from './threeWeeksPatternsService/twoTwoOneAny'
import { TwoTwoTwoAny } from './threeWeeksPatternsService/twoTwoTwoAny'
import { TwoTwoTwoPos } from './threeWeeksPatternsService/twoTwoTwoPos'
import { TwoOneOnePos } from './threeWeeksPatternsService/two-one-one-pos'
import { OneOneOnePos } from './threeWeeksPatternsService/one-one-one-pos'

@Injectable()
export class ThreeWeeksService {
  constructor(
    private readonly groupSelectionService: GroupSelectionService,
    private readonly payloadService: PayloadService,
    private readonly twoCloseTwoCloseOneAny: TwoCloseTwoCloseOneAny,
    private readonly twoOneTwoAny: TwoOneTwoAny,
    private readonly twoPosOneAnyTwoAny: TwoPosOneAnyTwoAny,
    private readonly twoPosOneAnyTwoCloseAny: TwoPosOneAnyTwoCloseAny,
    private readonly twoPosTwoAnyOneAny: TwoPosTwoAnyOneAny,
    private readonly twoPosTwoCloseOneAny: TwoPosTwoCloseOneAny,
    private readonly twoTwoOneAny: TwoTwoOneAny,
    private readonly twoTwoTwoAny: TwoTwoTwoAny,
    private readonly twoTwoTwoPos: TwoTwoTwoPos,
    private readonly twoCloseOneTwoCloseAny: TwoCloseOneTwoCloseAny,
    private readonly twoOneOnePos: TwoOneOnePos,
    private readonly oneOneOnePos: OneOneOnePos,
  ) {}

  getData() {
    const ghanas = this.payloadService.getGhanas()
    const groups = this.payloadService.getGroups()
    const premmiers = this.payloadService.getPremmiers()
    const games = this.payloadService.getGames()
    const patterns = this.payloadService.getThreeWeeksPatterns()

    return {
      ghanas,
      premmiers,
      groups,
      games,
      patterns,
    }
  }

  async search(queries: ThreeWeeksPayload) {
    const pattern = queries.pattern
    let patternFns: PatternFns

    switch (pattern) {
      case 'TwoCloseOneTwoCloseAny':
        patternFns = this.twoCloseOneTwoCloseAny
        break
      case 'TwoCloseTwoCloseOneAny':
        patternFns = this.twoCloseTwoCloseOneAny
        break
      case 'TwoOneTwoAny':
        patternFns = this.twoOneTwoAny
        break
      case 'TwoPosOneAnyTwoAny':
        patternFns = this.twoPosOneAnyTwoAny
        break
      case 'TwoPosOneAnyTwoCloseAny':
        patternFns = this.twoPosOneAnyTwoCloseAny
        break
      case 'TwoPosTwoAnyOneAny':
        patternFns = this.twoPosTwoAnyOneAny
        break
      case 'TwoPosTwoCloseOneAny':
        patternFns = this.twoPosTwoCloseOneAny
        break
      case 'TwoTwoOneAny':
        patternFns = this.twoTwoOneAny
        break
      case 'TwoTwoTwoAny':
        patternFns = this.twoTwoTwoAny
        break
      case 'TwoTwoTwoPos':
        patternFns = this.twoTwoTwoPos
        break
      case 'TwoOneOnePos':
        patternFns = this.twoOneOnePos
        break
      case 'OneOneOnePos':
        patternFns = this.oneOneOnePos
        break
      default:
        throw new HttpException('Invalid three-weeks-search pattern', HttpStatus.BAD_REQUEST)
    }

    const result = this.groupSelectionService.search(queries, patternFns)
    return result
  }
}
