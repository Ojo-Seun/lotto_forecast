import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GameCreatedEvent } from '../events/game-created.event'
import { RepoService } from 'src/repository/repo.service'

@Injectable()
export class GameYearsListener {
  constructor(private readonly repoService: RepoService) {}
  @OnEvent('game-created', { async: true })
  async handleGameCreatedEvent(event: GameCreatedEvent) {
    // Years of the game
    const yearsModel = this.repoService.getGameYearsModel()
    // delete the numbers of years for this game
    await yearsModel.deleteOne({ Game: event.Game })
    // Add new numbers of years for this game
    const yearsCreated = await yearsModel.create({
      Game: event.Game,
      Years: event.Years,
    })
    return yearsCreated
  }
}
