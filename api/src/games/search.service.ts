import { Injectable } from '@nestjs/common'
import { RepoService } from '.././repository/repo.service'
import { GameTypes, Games, WhereToSearch } from '../games/interface/types'
import { PayloadService } from '../global-utils/payload.service'
import { MatchFns, QueryTypes, SearchFns, SearchUpOrDown } from 'src/games/utils/types'

interface ResultType {
  game: GameTypes[]
  end: boolean
}

@Injectable()
export class SearchService {
  // private searchDownward: SearchUpOrDown
  // private searchUpward: SearchUpOrDown
  private game: GameTypes[]
  queries: QueryTypes
  matchFns: MatchFns
  constructor(private readonly repoService: RepoService, private readonly payloadService: PayloadService, private readonly searchFns: SearchFns) {}

  private async searchInWin() {
    const upResult = await this.searchFns.searchUpward(this.game, 'Winning', this.queries, this.matchFns)
    const downResult = await this.searchFns.searchDownward(this.game, 'Winning', this.queries, this.matchFns)
    return [...upResult, ...downResult]
  }

  private async searchInMachine() {
    const upResult = await this.searchFns.searchUpward(this.game, 'Machine', this.queries, this.matchFns)
    const downResult = await this.searchFns.searchDownward(this.game, 'Machine', this.queries, this.matchFns)

    return [...upResult, ...downResult]
  }

  /**
   *search in one game
   * @param gameModel
   * @param matchFns
   * @returns Promise<ResultType[]>
   */
  async searchInOneGame(gameName: Games, queries: QueryTypes, matchFns: MatchFns): Promise<ResultType[]> {
    // this.searchUpward = searcUp
    // this.searchDownward = searchDown
    this.queries = queries
    this.matchFns = matchFns
    const model = this.repoService.getModel(gameName)
    this.game = await model.find({})
    let result: ResultType[] = []
    const winResult = await this.searchInWin()
    const machineResult = await this.searchInMachine()
    const res = [...winResult, ...machineResult]
    console.log(winResult.length, machineResult.length)
    if (res.length > 0) {
      result.push({ game: res, end: true })
    }
    return result
  }

  /**
   * search in all ghana games
   * @param matchFns
   * @returns Promise<ResultType[]>
   */
  async searchInGhanaGames(queries: QueryTypes, matchFns: MatchFns): Promise<ResultType[]> {
    let result: ResultType[] = []
    const ghanas = this.payloadService.getGhanas()
    for (let i = 0; i < ghanas.length; i++) {
      const gameName = ghanas[i] as Games
      const resultFromOneGame = await this.searchInOneGame(gameName, queries, matchFns)
      result = [...result, ...resultFromOneGame]
    }

    return result
  }

  /**
   * search in all premmier games
   * @param matchFns
   * @returns Promise<ResultType[]>
   */

  async searchInPremmierGames(queries: QueryTypes, matchFns: MatchFns): Promise<ResultType[]> {
    let result: ResultType[] = []
    const premmiers = this.payloadService.getPremmiers()
    for (let i = 0; i < premmiers.length; i++) {
      const gameName = premmiers[i] as Games
      const resultFromOneGame = await this.searchInOneGame(gameName, queries, matchFns)
      result = [...result, ...resultFromOneGame]
    }
    return result
  }

  /**
   * search in all games
   * @param matchFns
   * @returns Promise<ResultType[]>
   */
  async searchInAllGames(queries: QueryTypes, matchFns: MatchFns): Promise<ResultType[]> {
    let result: ResultType[] = []
    const allGames = this.payloadService.getGames()
    for (let i = 0; i < allGames.length; i++) {
      const gameName = allGames[i] as Games
      const resultFromOneGame = await this.searchInOneGame(gameName, queries, matchFns)
      result = [...result, ...resultFromOneGame]
    }
    return result
  }
}
