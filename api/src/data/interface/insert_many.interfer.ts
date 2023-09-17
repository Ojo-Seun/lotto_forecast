import { GameTypes, Games } from 'src/games/interface/types'

export interface InsertMany {
  game: Games
  payload: [GameTypes]
  years: number[]
}
