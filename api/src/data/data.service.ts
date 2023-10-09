import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { GameTypes, Games, WhereToSearch } from '../games/interface/types'
import { RepoService } from '../repository/repo.service'
import { InsertMany } from './interface/insert_many.interfer'
import { GetEvents } from './interface/game-events.interface'
import { GetYearsDTO } from './dto/get-yearsDto'
import { GetChartDTO } from './dto/get-chartDto'

@Injectable()
export class DataService {
  constructor(private readonly repoService: RepoService) {}

  async getGameDetails(name: Games) {
    try {
      const model = this.repoService.getModel(name)
      const game = await model.find({})
      const nextIndex = game?.length || 0
      const last2Events = game?.slice(-2) || []
      const lastIndex = last2Events[1]?.Index || 0
      return {
        nextIndex,
        lastIndex,
        last2Events,
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  private getTargetEvents(events: GameTypes[], whereToExtractData: WhereToSearch) {
    let targetEvents = events.map((event) => event[whereToExtractData])
    return (targetEvents = targetEvents.reverse())
  }

  async getEvents(payload: GetEvents) {
    const { game, weeksApart, whereToExtractData } = payload
    try {
      const model = this.repoService.getModel(game)
      const games: GameTypes[] = (await model.find({})) ?? []
      const events = games.slice(weeksApart < 3 ? -3 : -weeksApart - 1)
      return {
        gameEvents: events,
        targetEvents: this.getTargetEvents(events, whereToExtractData) ?? [],
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  async getYears(payload: GetYearsDTO) {
    try {
      const model = this.repoService.getGameYearsModel()
      const res = await model.findOne({ Game: payload.game })
      return res?.Years
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  async getChart(payload: GetChartDTO) {
    try {
      const model = this.repoService.getModel(payload.game)
      const game = await model.find({ Year: payload.year })
      return game
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  private async createGameYears(game: Games, years: number[]) {
    // Years of the game model
    const yearsModel = this.repoService.getGameYearsModel()
    // delete the numbers of years for this game
    await yearsModel.deleteOne({ Game: game })
    // Add new numbers of years for this game
    const yearsCreated = await yearsModel.create({
      Game: game,
      Years: years,
    })
    return yearsCreated
  }

  async insertMany(data: InsertMany) {
    const { game, payload, years } = data
    try {
      const gameModel = this.repoService.getModel(game)
      const previousEntries = await gameModel.find({})
      await gameModel.deleteMany({})
      const res = await gameModel.insertMany(payload)
      const response = res?.slice(-1)[0] ?? []
      const newGame: GameTypes[] = await gameModel.find({})

      // Handle game years creation
      const yearsCreated = await this.createGameYears(game, years)

      return {
        newEntries: newGame.length,
        previousEntries: previousEntries.length,
        response,
        yearsCreated,
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async insertOne(game: Games, payload: GameTypes) {
    try {
      const model = this.repoService.getModel(game)
      const oldGame: GameTypes[] = await model.find({})
      if (oldGame?.length < 10) {
        throw new HttpException('game have not being uploaded', 500)
      }

      if (oldGame[0].Name !== payload.Name) {
        throw new HttpException(`${oldGame[0].Name} and ${payload.Name} did not match`, 500)
      }

      const res = await model.bulkWrite([
        {
          insertOne: {
            document: { ...payload },
          },
        },
      ])
      const newGame: GameTypes[] = await model.find({})
      return {
        newEntries: newGame.length,
        previousEntries: oldGame.length,
        response: res,
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}
