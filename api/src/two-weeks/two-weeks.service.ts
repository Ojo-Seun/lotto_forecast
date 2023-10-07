import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PayloadService } from 'src/global-utils/payload.service'
import { ResultType, TwoWeeksPayload } from '../games/utils/types'
import { PatternFns } from '../games/utils/types'
import { TwoCloseTwoClose } from './two-weeks-pattern-service/twoCloseTwoClose'
import { TwoCloseTwoAny } from './two-weeks-pattern-service/twoCloseTwoAny'
import { TwoPosTwoPos } from './two-weeks-pattern-service/twoPosTwoPos'
import { GroupSelectionService } from 'src/games/group-selection.service'
import { RepoService } from 'src/repository/repo.service'
import { GameTypes, Games } from 'src/games/interface/types'
import { TwoCloseTwoPos } from './two-weeks-pattern-service/twoCloseTwoPos'
import { TwoPosOnePos } from './two-weeks-pattern-service/twoPosOnePos'
import { TwoCloseTwoClosePos } from './two-weeks-pattern-service/twoCloseTwoClosePos'

@Injectable()
export class TwoWeeksService {
  constructor(
    private readonly payloadService: PayloadService,
    private readonly groupSelectionService: GroupSelectionService,
    private readonly repoService: RepoService,
    private readonly twoCloseTwoAny: TwoCloseTwoAny,
    private readonly twoPosTwoPos: TwoPosTwoPos,
    private readonly twoCloseTwoClose: TwoCloseTwoClose,
    private readonly twoCloseTwoPos: TwoCloseTwoPos,
    private readonly twoPosOnePos: TwoPosOnePos,
    private readonly twoCloseTwoClosePos: TwoCloseTwoClosePos,
  ) {}

  getData() {
    const ghanas = this.payloadService.getGhanas()
    const groups = this.payloadService.getGroups()
    const premmiers = this.payloadService.getPremmiers()
    const games = this.payloadService.getGames()
    const patterns = this.payloadService.getTwoWeeksPatterns()

    return {
      ghanas,
      premmiers,
      groups,
      games,
      patterns,
    }
  }

  async autoSearch(queries: TwoWeeksPayload): Promise<ResultType[]> {
    try {
      let results: ResultType[] = []
      const { weeksApart, whereToExtract, gameToForecast } = queries

      const model = this.repoService.getModel(gameToForecast)
      const data: GameTypes[] = await model.find({})
      if (data.length < 1) {
        throw new HttpException('game database is empty', HttpStatus.EXPECTATION_FAILED)
      }
      const startIndex = data.length - weeksApart - 1
      const endIndex = data.length - 1
      const eventsExtracted = data.slice(startIndex, endIndex)
      const events = eventsExtracted.map((event) => event[whereToExtract])
      const length = events.length
      for (let i = 1; i <= weeksApart; i++) {
        const secondEvent = events[length - i]
        const res = await this.search({ ...queries, weeksApart: i, secondToLastEvent: secondEvent })
        results = [...results, ...res]
      }

      return results
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  async manualSearch(queries: TwoWeeksPayload): Promise<ResultType[]> {
    const res = await this.search(queries)
    return res
  }

  private async search(queries: TwoWeeksPayload) {
    const { pattern } = queries

    let patternFns: PatternFns

    switch (pattern) {
      case 'TwoCloseTwoClose':
        patternFns = this.twoCloseTwoClose
        break
      case 'TwoCloseTwoAny':
        patternFns = this.twoCloseTwoAny
        break
      case 'TwoPosTwoPos':
        patternFns = this.twoPosTwoPos
        break
      case 'TwoCloseTwoClosePos':
        patternFns = this.twoCloseTwoClosePos
        break
      case 'TwoCloseTwoPos':
        patternFns = this.twoCloseTwoPos
        break
      case 'TwoPosOnePos':
        patternFns = this.twoPosOnePos
        break
      default:
        throw new HttpException('Invalid two-weeks-search pattern', HttpStatus.BAD_REQUEST)
    }

    const result = await this.groupSelectionService.search(queries, patternFns)
    return result
  }
}
