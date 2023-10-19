import { Games, Group, WhereToSearch, WinningOrMachineEvent } from 'src/games/interface/types'

type ThreeWeeksPattern = 'TwoOneTwoAny' | 'TwoPosOneAnyTwoAny' | 'TwoPosTwoAnyOneAny' | 'TwoTwoOneAny' | 'TwoTwoTwoAny' | 'TwoTwoTwoPos' | 'TwoPosOneAnyTwoCloseAny' | 'TwoCloseOneTwoCloseAny' | 'TwoCloseTwoCloseOneAny' | 'TwoPosTwoCloseOneAny' | 'TwoOneOnePos' | 'OneOneOnePos'
interface ThreeWeeksPayload {
  thirdToLastEvent: WinningOrMachineEvent
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games
  group: Group
  numOfWeeksToAdd: number
  pattern: ThreeWeeksPattern
  gameToForecast: Games
}
export type { ThreeWeeksPattern, ThreeWeeksPayload }
