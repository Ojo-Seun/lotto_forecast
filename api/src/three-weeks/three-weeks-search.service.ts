import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { GameTypes, WhereToSearch } from 'src/games/interface/types'
import { ResultType, ThreeWeeksMatchFns } from '../games/utils/types'
import { ThreeWeeksPayload } from './interface/types'
import { SearchService } from 'src/games/search.service'

@Injectable()
export class ThreeWeeksSearchService {
  constructor(private readonly searchService: SearchService) {}

  async searchInOneGame(matchFns: ThreeWeeksMatchFns, queries: ThreeWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInOneGame(queries.game, queries, matchFns)
  }

  async searchInGhanaGames(matchFns: ThreeWeeksMatchFns, queries: ThreeWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInGhanaGames(queries, matchFns)
  }

  async searchInPremmierGames(matchFns: ThreeWeeksMatchFns, queries: ThreeWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInPremmierGames(queries, matchFns)
  }

  async searchInAllGames(matchFns: ThreeWeeksMatchFns, queries: ThreeWeeksPayload): Promise<ResultType[]> {
    return await this.searchService.searchInAllGames(queries, matchFns)
  }
}
