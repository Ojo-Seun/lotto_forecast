import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PayloadService } from 'src/global-utils/payload.service'
import { ResultType, TwoWeeksPayload } from '../games/utils/types'
import { PatternFns } from '../games/utils/types'
import { TwoCloseTwoClose } from './two-weeks-pattern-service/twoCloseTwoClose'
import { TwoCloseTwoAny } from './two-weeks-pattern-service/twoCloseTwoAny'
import { TwoPosTwoPos } from './two-weeks-pattern-service/twoPosTwoPos'
import { AutoSelectService } from 'src/games/autoSelect.service'
import { RepoService } from 'src/repository/repo.service'

@Injectable()
export class TwoWeeksService {
  constructor(
    private readonly payloadService: PayloadService,
    private readonly autoSelectService: AutoSelectService,
    private readonly repoService: RepoService,
    private readonly twoCloseTwoAny: TwoCloseTwoAny,
    private readonly twoPosTwoPos: TwoPosTwoPos,
    private readonly twoCloseTwoClose: TwoCloseTwoClose,
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
      const { weeksApart, game } = queries

      const model = this.repoService.getModel(game)
      const data = await model.find({})
      const targetIndexies = data.length - weeksApart
      const events = data.slice(targetIndexies)
      const length = events.length

      for (let i = 1; i <= weeksApart; i++) {
        const secondEvent = events[length - i]
        const res = await this.search({ ...queries, weeksApart: i, secondToLastEvent: secondEvent })
        results = [...res]
      }

      return results
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async manualSearch(queries: TwoWeeksPayload): Promise<ResultType[]> {
    const res = this.search(queries)
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
      default:
        throw new HttpException('Invalid three-weeks-search pattern', HttpStatus.BAD_REQUEST)
    }

    const result = this.autoSelectService.search(queries, patternFns)
    return result
  }
}
