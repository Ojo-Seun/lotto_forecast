import { Games } from 'src/games/interface/types'

export class GameCreatedEvent {
  Game: Games
  Years: number[]
}
