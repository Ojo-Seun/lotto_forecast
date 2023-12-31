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
}
type Group = "PREMMIER" | "GHANA"
interface GameDetails {
  nextIndex: number
  lastIndex: number
  last2Events: Pick<GameTypes, "Winning" | "Machine">[]
}
interface InsertMany {
  game: Games
  payload: GameTypes[]
  years: number[]
}

interface InsertOne {
  game: Games
  payload: GameTypes
}

type Login = Omit<CreateUser, "name" | "code">
interface CreateUser {
  name: string
  email: string
  password: string
  code: string
}
type SendEmail = Omit<CreateUser, "password" | "code">
type Role = "USER" | "SUBSCRIBER" | "ADMINISTRATOR"
type Roles = Role[]
type ResetPass = Omit<CreateUser, "name">
interface SendPassResetCode {
  email: string
  code: string
}

type Operation = "Insert Many" | "Insert One"
export type {
  Payload,
  Group,
  ResetPass,
  SendPassResetCode,
  InsertOne,
  CreateUser,
  SendEmail,
  Roles,
  Role,
  Login,
  GameDetails,
  Operation,
  InsertMany,
  Games,
  WinningOrMachineEvent,
  Category,
  WhereToSearch,
  EventLevel,
}
