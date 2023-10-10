import { Injectable } from '@nestjs/common'
import { GameTypes, Games, WhereToSearch } from 'src/games/interface/types'
import { OneWeekPayload } from './interface/types'
import { OneWeekMatchFns, ResultType } from 'src/games/utils/types'
import { HttpException, HttpStatus } from '@nestjs/common'
import { RepoService } from 'src/repository/repo.service'
import { PayloadService } from 'src/global-utils/payload.service'

@Injectable()
export class OneWeekSearchService {
  constructor(private readonly repoService: RepoService, private readonly payloadService: PayloadService) {}
  private extractPropertyFromObj(obj: GameTypes) {
    const { Index, Winning, Machine, Ev, WT, MT, Date, Name, Category, _id, Year } = obj
    return {
      Index,
      Winning,
      Machine,
      Ev,
      WT,
      MT,
      Date,
      Name,
      Category,
      target: true,
      _id,
      Year,
    }
  }

  /**
   * Loop and find patterns in passed results start from last event
   * @param game
   * @param whereToSearch
   * @returns Promise<GameTyps[]>
   */

  /**
   * Loop and find patterns in passed results start from 1st event
   * @param game
   * @param queries
   * @param matchFns
   * @returns Promise<GameTypes[]>
   */
  private async search(game: GameTypes[], queries: OneWeekPayload, matchFns: OneWeekMatchFns): Promise<GameTypes[]> {
    let result: GameTypes[] = []
    try {
      const { lastEvent, numOfWeeksToAdd } = queries
      const winEvent = lastEvent['Winning']
      const macEvent = lastEvent['Machine']

      const len = game.length

      for (let i = 0; i < len; i++) {
        const lastIndex = i

        const isMatchInWin = await matchFns.isMatchInWin(game[lastIndex], winEvent, 'Winning')
        if (isMatchInWin) {
          const isMatchInMac = await matchFns.isMatchInMac(game[lastIndex], macEvent, 'Machine')
          if (isMatchInMac) {
            game[lastIndex] = { ...this.extractPropertyFromObj(game[lastIndex]), weeksApart: 0, direction: 'down' }
            const start = i - numOfWeeksToAdd < 0 ? 0 : i - numOfWeeksToAdd
            const end = numOfWeeksToAdd + i > game.length ? game.length : i + numOfWeeksToAdd
            console.log({ start, end })
            const arr = game.slice(start, end)

            result = [...result, ...arr]
          }
        }
      }

      return result
    } catch (error: any) {
      console.log({ error: error.message, from: 'occured in search function in OneWeekSearchService' })

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   *search in one game
   * @param gameModel
   * @param matchFns
   * @returns Promise<ResultType[]>
   */
  async searchInOneGame(gameName: Games, queries: OneWeekPayload, matchFns: OneWeekMatchFns): Promise<ResultType[]> {
    const isGameToForecast = queries.gameToForecast === gameName
    const model = this.repoService.getModel(gameName)
    let game = await model.find({})

    if (isGameToForecast) {
      // Remove last event
      game.splice(-1)
    }
    let result: ResultType[] = []
    const res = await this.search(game, queries, matchFns)
    console.log(res.length)
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
  async searchInGhanaGames(queries: OneWeekPayload, matchFns: OneWeekMatchFns): Promise<ResultType[]> {
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

  async searchInPremmierGames(queries: OneWeekPayload, matchFns: OneWeekMatchFns): Promise<ResultType[]> {
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
  async searchInAllGames(queries: OneWeekPayload, matchFns: OneWeekMatchFns): Promise<ResultType[]> {
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
