type Games =
  | "NATIONAL"
  | "BINGO"
  | "BONANZA"
  | "CLUB MASTER"
  | "DIAMOND"
  | "ENUGU"
  | "FAIR CHANCE"
  | "FORTUNE"
  | "GOLD"
  | "INTERNATIONAL"
  | "JACKPOT"
  | "KING"
  | "LUCKY G"
  | "MARK-II"
  | "METRO"
  | "MID WEEK"
  | "MSP"
  | "O6"
  | "PEOPLES"
  | "LUCKY"
  | "ROYAL"
  | "SUPER"
  | "TOTA"
  | "VAG"

type WinningOrMachineEvent = [number, number, number, number, number]
interface Payload {
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  gameName: Games
  group: Group
  numOfWeeksToAdd: number
}

type EventLevel = "lastEvent" | "secondToLastEvent" | "thirdToLastEvent"
type WhereToSearch = "Machine" | "Winning"
type Category = "PREMMIER" | "GHANA"
type Direction = "up" | "down"
export interface GameTypes {
  Name: Games
  Index: number
  WT: number
  MT: number
  Date: string
  Winning: WinningOrMachineEvent
  Machine: WinningOrMachineEvent
  Category: Category
  Year: number
  Ev: number
  direction?: Direction
  target?: boolean
  searchedIn?: WhereToSearch
  weeksApart?: number
  _id?: string
}
type Group = "PREMMIER" | "GHANA"

interface GetEvents {
  game: Games
  weeksApart: number
  whereToExtractData: WhereToSearch
}
type ThreeWeeksPatterns =
  | "TwoOneTwoAny"
  | "TwoPosOneAnyTwoAny"
  | "TwoPosTwoAnyOneAny"
  | "TwoTwoOneAny"
  | "TwoTwoTwoAny"
  | "TwoTwoTwoPos"
  | "TwoPosOneAnyTwoCloseAny"
  | "TwoCloseOneTwoCloseAny"
  | "TwoCloseTwoCloseOneAny"
  | "TwoPosTwoCloseOneAny"
type TwoWeeksPatterns = "TwoCloseTwoClose" | "TwoPosOnePos" | "TwoPosTwoPos" | "TwoCloseTwoAny" | "TwoCloseTwoClosePos" | "TwoCloseTwoPos" | "TwoPosTwoClose"

interface ThreeWeeksPayload {
  thirdToLastEvent: WinningOrMachineEvent
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games | "ALL"
  group: Group | "ALL"
  numOfWeeksToAdd: number
  pattern: ThreeWeeksPatterns
  gameToForecast: Games
}

interface TwoWeeksPayload {
  secondToLastEvent: WinningOrMachineEvent
  lastEvent: WinningOrMachineEvent
  game: Games | "ALL"
  group: Group | "ALL"
  numOfWeeksToAdd: number
  pattern: TwoWeeksPatterns
  weeksApart: number
  whereToExtract: WhereToSearch
  gameToForecast: Games
}
type QueryTypes = TwoWeeksPayload | ThreeWeeksPayload
interface ResultType {
  game: GameTypes[]
  end: boolean
}

type Login = Omit<CreateUser, "name">
interface CreateUser {
  name: string
  email: string
  password: string
}
type SendEmail = Omit<CreateUser, "password">
interface EmailVerification {
  email: string
  code: string
}

export type {
  EmailVerification,
  SendEmail,
  CreateUser,
  Login,
  ResultType,
  GetEvents,
  Payload,
  Group,
  Games,
  WinningOrMachineEvent,
  Category,
  WhereToSearch,
  EventLevel,
  QueryTypes,
  TwoWeeksPayload,
  ThreeWeeksPayload,
  TwoWeeksPatterns,
  ThreeWeeksPatterns,
}
