import { Games, WhereToSearch } from 'src/games/interface/types'

export interface GetEvents {
  game: Games
  weeksApart: number
  whereToExtractData: WhereToSearch
}
