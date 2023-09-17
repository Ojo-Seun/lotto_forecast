import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MatchFnService } from 'src/games/matchFns.service'
import { ResultType, ThreeWeeksMatchFns } from 'src/games/utils/types'
import { ThreeWeeksSearchService } from '../three-weeks-search.service'
import { ThreeWeeksPayload } from '../interface/types'

/**
 * two nums at any pos in last event
 * follow by one num at any pos in secondToLastEvent
 * follow by two nums at any in thirdToLastEvent
 */
@Injectable()
export class TwoOneTwoAny {
  threeWeeksmatchFns: ThreeWeeksMatchFns
  constructor(private readonly matchFn: MatchFnService, private readonly threeWeeksSearchService: ThreeWeeksSearchService) {
    this.threeWeeksmatchFns = {
      isMatchLastEvent: this.matchFn.twoNumsAnyPos,
      isMatchSecondEvent: this.matchFn.oneNumsAnyPos,
      isMatchThirdEvent: this.matchFn.twoNumsAnyPos,
    }
  }

  /**
   * search in one game
   * @returns Promise<ResultType[] | []>
   */

  async searchInOneGame(queries: ThreeWeeksPayload): Promise<ResultType[] | []> {
    try {
      const res = await this.threeWeeksSearchService.searchInOneGame(this.threeWeeksmatchFns, queries)
      return res
    } catch (error: any) {
      throw new HttpException(error.message + ' from searchInOneGame function', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * search in all ghana games
   * @returns Promise<ResultType[] | []>
   */
  async searchInGhanaGames(queries: ThreeWeeksPayload): Promise<ResultType[] | []> {
    const res = await this.threeWeeksSearchService.searchInGhanaGames(this.threeWeeksmatchFns, queries)
    return res
  }

  /**
   * search in all premmier games
   * @returns Promise<ResultType[] | []>
   */

  async searchInPremmierGames(queries: ThreeWeeksPayload): Promise<ResultType[] | []> {
    const res = await this.threeWeeksSearchService.searchInPremmierGames(this.threeWeeksmatchFns, queries)
    return res
  }

  /**
   * search in all games
   * @returns Promise<ResultType[] | []>
   */
  async searchInAllGames(queries: ThreeWeeksPayload): Promise<ResultType[] | []> {
    const res = await this.threeWeeksSearchService.searchInAllGames(this.threeWeeksmatchFns, queries)
    return res
  }
}
