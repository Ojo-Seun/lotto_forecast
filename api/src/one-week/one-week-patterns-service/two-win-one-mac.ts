import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MatchFnService } from 'src/games/matchFns.service'
import { ResultType, OneWeekMatchFns } from 'src/games/utils/types'
import { OneWeekSearchService } from '../one-week-search-service'
import { OneWeekPayload } from '../interface/types'

/**
 * two nums at the same pos in last event in winning
 * follow by one num at  pos in last event in machine
 */
@Injectable()
export class TwoWinOneMac {
  oneWeekmatchFns: OneWeekMatchFns
  constructor(private readonly matchFn: MatchFnService, private readonly oneWeekSearchService: OneWeekSearchService) {
    this.oneWeekmatchFns = {
      isMatchInWin: this.matchFn.twoAtPos,
      isMatchInMac: this.matchFn.oneNumsAtPos,
    }
  }

  /**
   * search in one game
   * @returns Promise<ResultType[] | []>
   */

  async searchInOneGame(queries: OneWeekPayload): Promise<ResultType[] | []> {
    try {
      const res = await this.oneWeekSearchService.searchInOneGame(queries.game, queries, this.oneWeekmatchFns)
      return res
    } catch (error: any) {
      throw new HttpException(error.message + ' from searchInOneGame function', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * search in all ghana games
   * @returns Promise<ResultType[] | []>
   */
  async searchInGhanaGames(queries: OneWeekPayload): Promise<ResultType[] | []> {
    const res = await this.oneWeekSearchService.searchInGhanaGames(queries, this.oneWeekmatchFns)
    return res
  }

  /**
   * search in all premmier games
   * @returns Promise<ResultType[] | []>
   */

  async searchInPremmierGames(queries: OneWeekPayload): Promise<ResultType[] | []> {
    const res = await this.oneWeekSearchService.searchInPremmierGames(queries, this.oneWeekmatchFns)
    return res
  }

  /**
   * search in all games
   * @returns Promise<ResultType[] | []>
   */
  async searchInAllGames(queries: OneWeekPayload): Promise<ResultType[] | []> {
    const res = await this.oneWeekSearchService.searchInAllGames(queries, this.oneWeekmatchFns)
    return res
  }
}
