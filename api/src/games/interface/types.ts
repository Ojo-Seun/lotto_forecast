type Games = 'NATIONAL' | 'BINGO' | 'BONANZA' | 'CLUB MASTER' | 'DIAMOND' | 'ENUGU' | 'FAIR CHANCE' | 'FORTUNE' | 'GOLD' | 'INTERNATIONAL' | 'JACKPOT' | 'KING' | 'LUCKY G' | 'MARK-II' | 'METRO' | 'MID WEEK' | 'MSP' | 'O6' | 'PEOPLES' | 'LUCKY' | 'ROYAL' | 'SUPER' | 'TOTA' | 'VAG'

type WinningOrMachineEvent = [number, number, number, number, number]
type Group = 'GHANA' | 'PREMMIER' | 'ALL'
interface Payload {
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  gameName: Games
  group: Group
  numOfWeeksToAdd: number
}

type EventLevel = 'lastEvent' | 'secondToLastEvent' | 'thirdToLastEvent'
type WhereToSearch = 'Machine' | 'Winning'
type Direction = 'up' | 'down'
type Category = 'PREMMIER' | 'GHANA'
export class GameTypes {
  Name: Games
  Index: number
  WT: number
  MT: number
  Date: string
  Winning: WinningOrMachineEvent
  Machine: WinningOrMachineEvent
  Category: Category
  Year: number
  _id?: string
  target?: boolean
  level?: EventLevel
  searchedIn?: WhereToSearch
  direction?: Direction
  weeksApart?: number
  Ev: number
}
export type { Payload, Games, Group, WinningOrMachineEvent, Category, WhereToSearch, EventLevel }
