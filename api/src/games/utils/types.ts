import { GameTypes, Games, Group, WinningOrMachineEvent } from '../interface/types'

type ThreeWeeksPatterns = 'TwoOneTwoAny' | 'TwoPosOneAnyTwoAny' | 'TwoPosTwoAnyOneAny' | 'TwoTwoOneAny' | 'TwoTwoTwoAny' | 'TwoTwoTwoPos' | 'TwoPosOneAnyTwoCloseAny' | 'TwoCloseOneTwoCloseAny' | 'TwoCloseTwoCloseOneAny' | 'TwoPosTwoCloseOneAny'
type TwoWeeksPatterns = 'TwoCloseTwoClose' | 'TwoPosOnePos' | 'TwoPosTwoPos' | 'TwoCloseTwoAny' | 'TwoCloseTwoClosePos' | 'TwoCloseTwoPos'
type Patterns = ThreeWeeksPatterns | TwoWeeksPatterns
type WhereToSearch = 'Winning' | 'Machine'

interface ResultType {
  game: GameTypes[]
  end: boolean
}

type Matcher = (targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch) => Promise<boolean>
interface ThreeWeeksMatchFns {
  isMatchLastEvent: Matcher
  isMatchSecondEvent: Matcher
  isMatchThirdEvent: Matcher
}

interface TwoWeeksMatchFns {
  isMatchLastEvent: Matcher
  isMatchSecondEvent: Matcher
}

type MatchFns = ThreeWeeksMatchFns | TwoWeeksMatchFns

interface PatternFns {
  searchInOneGame: (queries: QueryTypes) => Promise<ResultType[]>
  searchInGhanaGames: (queries: QueryTypes) => Promise<ResultType[]>
  searchInPremmierGames: (queries: QueryTypes) => Promise<ResultType[]>
  searchInAllGames: (queries: QueryTypes) => Promise<ResultType[]>
}

interface ThreeWeeksPayload {
  thirdToLastEvent: WinningOrMachineEvent
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games
  group: Group
  numOfWeeksToAdd: number
  pattern: ThreeWeeksPatterns
  gameToForecast: Games
}

interface TwoWeeksPayload {
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games
  group: Group
  numOfWeeksToAdd: number
  pattern: TwoWeeksPatterns
  weeksApart: number
  whereToExtract: WhereToSearch
  gameToForecast: Games
}
type QueryTypes = TwoWeeksPayload | ThreeWeeksPayload

interface SearchFns {
  searchDownward: SearchUpOrDown
  searchUpward: SearchUpOrDown
}

type SearchUpOrDown = (game: GameTypes[], whereToSearch: WhereToSearch, queries: QueryTypes, matchFns: MatchFns) => Promise<GameTypes[]>
export { MatchFns, SearchFns, ResultType, PatternFns, QueryTypes, SearchUpOrDown, ThreeWeeksPayload, TwoWeeksPayload, ThreeWeeksMatchFns, TwoWeeksMatchFns }
