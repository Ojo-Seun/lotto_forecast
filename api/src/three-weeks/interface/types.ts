import { Games, Group, WinningOrMachineEvent } from 'src/games/interface/types'

type ThreeWeeksPattern = 'TwoOneTwoAny' | 'TwoPosOneAnyTwoAny' | 'TwoPosTwoAnyOneAny' | 'TwoTwoOneAny' | 'TwoTwoTwoAny' | 'TwoTwoTwoPos' | 'TwoPosOneAnyTwoCloseAny' | 'TwoCloseOneTwoCloseAny' | 'TwoCloseTwoCloseOneAny' | 'TwoPosTwoCloseOneAny'
interface ThreeWeeksPayload {
  thirdToLastEvent: WinningOrMachineEvent
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games
  group: Group
  numOfWeeksToAdd: number
  pattern: ThreeWeeksPattern
}
export type { ThreeWeeksPattern, ThreeWeeksPayload }
