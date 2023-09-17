import { Games, Group, WinningOrMachineEvent } from '../../games/interface/types'

type TwoWeeksPattern = 'TwoCloseTwoClose' | 'TwoPosOnePos' | 'TwoPosTwoPos' | 'TwoCloseTwoAny'

interface TwoWeeksPayload {
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games
  group: Group
  numOfWeeksToAdd: number
  pattern: TwoWeeksPattern
  weeksApart: number
}

export type { TwoWeeksPattern, TwoWeeksPayload }
