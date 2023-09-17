import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { GameTypes, Games } from '../games/interface/types'
import { RepoService } from '../repository/repo.service'
import { InsertMany } from './interface/insert_many.interfer'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { GameCreatedEvent } from './events/game-created.event'

@Injectable()
export class DataService {
  constructor(private readonly repoService: RepoService, private readonly eventEmitter: EventEmitter2) {}

  async getGameDetails(name: Games) {
    try {
      const model = this.repoService.getModel(name)
      const game = await model.find({})
      const nexIndex = game?.length
      const last2Events = game?.slice(-2)
      return {
        nexIndex,
        last2Events,
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async insertMany(data: InsertMany) {
    const { game, payload, years } = data
    try {
      const gameModel = this.repoService.getModel(game)
      await gameModel.deleteMany({})
      const res = await gameModel.insertMany(payload)
      const newGame: GameTypes[] = await gameModel.find({})

      // Handle gameCreate event
      const gameCreatedEvent = new GameCreatedEvent()
      gameCreatedEvent.Game = game
      gameCreatedEvent.Years = years
      const yearsCreated = await this.eventEmitter.emitAsync('game-created', gameCreatedEvent)

      return {
        newEntries: newGame.length,
        response: res,
        yearsCreated,
      }
    } catch (error) {
      console.log(error.message)

      throw new HttpException(error.message, 500)
    }
  }

  async update(game: Games, payload: GameTypes) {
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
        response: res,
      }
    } catch (error) {
      console.log(error.message)

      throw new HttpException(error.message, 500)
    }
  }
}
