import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MatchFnService } from 'src/games/matchFns.service'
import { ResultType, ThreeWeeksMatchFns } from 'src/games/utils/types'
import { ThreeWeeksSearchService } from '../three-weeks-search.service'
import { ThreeWeeksPayload } from '../interface/types'

/**
 * two nums at the same pos in last event
 * follow by two nums at the same pos in secondToLastEvent
 * follow by two nums at same pos in thirdToLastEvent
 */
@Injectable()
export class TwoTwoTwoPos {
  threeWeeksmatchFns: ThreeWeeksMatchFns
  constructor(private readonly matchFn: MatchFnService, private readonly threeWeeksSearchService: ThreeWeeksSearchService) {
    this.threeWeeksmatchFns = {
      isMatchLastEvent: this.matchFn.twoNumsCloseAtPos,
      isMatchSecondEvent: this.matchFn.twoNumsCloseAtPos,
      isMatchThirdEvent: this.matchFn.twoNumsCloseAtPos,
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
