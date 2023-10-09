import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { SearchService } from 'src/games/search.service'
import { TwoWeeksPayload } from './interface/types'
import { ResultType, TwoWeeksMatchFns } from 'src/games/utils/types'

@Injectable()
export class TwoWeeksSearchService {
  constructor(private readonly searchService: SearchService) {}

  async searchInOneGame(matchFns: TwoWeeksMatchFns, queries: TwoWeeksPayload): Promise<ResultType[]> {
    try {
      return await this.searchService.searchInOneGame(queries.game, queries, matchFns)
    } catch (error) {
      throw new HttpException(error.message + ' from searchInOneGame of TwoWeeksSearchService function', HttpStatus.EXPECTATION_FAILED)
    }
  }

  async searchInGhanaGames(matchFns: TwoWeeksMatchFns, queries: TwoWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInGhanaGames(queries, matchFns)
  }

  async searchInPremmierGames(matchFns: TwoWeeksMatchFns, queries: TwoWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInPremmierGames(queries, matchFns)
  }

  async searchInAllGames(matchFns: TwoWeeksMatchFns, queries: TwoWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInAllGames(queries, matchFns)
  }
}
