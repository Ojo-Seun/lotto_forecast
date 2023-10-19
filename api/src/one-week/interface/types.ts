import { GameTypes, Games, Group, WinningOrMachineEvent } from 'src/games/interface/types'

type OneWeekPattern = 'TwoWinTwoMac' | 'TwoWinOneMac' | 'OneWinTwoMac' | 'OneWinOneMac' | 'TwoWinMacAny'

type OneWeekEvent = Pick<GameTypes, 'Winning' | 'Machine'>

interface OneWeekPayload {
  lastEvent: OneWeekEvent
  game: Games
  group: Group
  numOfWeeksToAdd: number
  pattern: OneWeekPattern

  gameToForecast: Games
}

export { OneWeekPattern, OneWeekEvent, OneWeekPayload }
