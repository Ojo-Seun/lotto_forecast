import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { MatchFnService } from 'src/games/matchFns.service'
import { TwoWeeksSearchService } from '../two-weeks-search.service'
import { ResultType, TwoWeeksMatchFns } from 'src/games/utils/types'
import { TwoWeeksPayload } from '../interface/types'

@Injectable()
export class TwoCloseTwoAny {
  twoWeeksMatchFns: TwoWeeksMatchFns
  constructor(private readonly matchFn: MatchFnService, private readonly twoWeeksSearchService: TwoWeeksSearchService) {
    this.twoWeeksMatchFns = {
      isMatchLastEvent: matchFn.twoCloseNumsAnyPos,
      isMatchSecondEvent: matchFn.twoNumsAnyPos,
    }
  }

  /**
   * search in one game
   * @returns Promise<ResultType[] | []>
   */

  async searchInOneGame(queries: TwoWeeksPayload): Promise<ResultType[] | []> {
    try {
      const res = await this.twoWeeksSearchService.searchInOneGame(this.twoWeeksMatchFns, queries)
      return res
    } catch (error: any) {
      throw new HttpException(error.message + ' from searchInOneGame function in Twoweeks clas', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * search in all ghana games
   * @returns Promise<ResultType[] | []>
   */
  async searchInGhanaGames(queries: TwoWeeksPayload): Promise<ResultType[] | []> {
    const res = await this.twoWeeksSearchService.searchInGhanaGames(this.twoWeeksMatchFns, queries)
    return res
  }

  /**
   * search in all premmier games
   * @returns Promise<ResultType[] | []>
   */

  async searchInPremmierGames(queries: TwoWeeksPayload): Promise<ResultType[] | []> {
    const res = await this.twoWeeksSearchService.searchInPremmierGames(this.twoWeeksMatchFns, queries)
    return res
  }

  /**
   * search in all games
   * @returns Promise<ResultType[] | []>
   */
  async searchInAllGames(queries: TwoWeeksPayload): Promise<ResultType[] | []> {
    const res = await this.twoWeeksSearchService.searchInAllGames(this.twoWeeksMatchFns, queries)
    return res
  }
}
