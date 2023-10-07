import { WinningOrMachineEvent } from "./type"

const games: Readonly<string[]> = [
  "NATIONAL",
  "BINGO",
  "BONANZA",
  "CLUB MASTER",
  "DIAMOND",
  "ENUGU",
  "FAIR CHANCE",
  "FORTUNE",
  "GOLD",
  "INTERNATIONAL",
  "JACKPOT",
  "KING",
  "LUCKY G",
  "MARK-II",
  "METRO",
  "MID WEEK",
  "MSP",
  "O6",
  "PEOPLES",
  "LUCKY",
  "ROYAL",
  "SUPER",
  "TOTA",
  "VAG",
]
const groups: Readonly<string[]> = ["GHANA", "PREMMIER"]

const premmiers: Readonly<string[]> = [
  "BINGO",
  "CLUB MASTER",
  "DIAMOND",
  "ENUGU",
  "FAIR CHANCE",
  "GOLD",
  "INTERNATIONAL",
  "JACKPOT",
  "KING",
  "MARK-II",
  "METRO",
  "O6",
  "PEOPLES",
  "LUCKY",
  "ROYAL",
  "SUPER",
  "TOTA",
  "VAG",
]
const ghanas: Readonly<string[]> = ["NATIONAL", "BONANZA", "LUCKY G", "FORTUNE", "MID WEEK", "MSP"]
const threeWeeksPatterns: Readonly<string[]> = [
  "TwoOneTwoAny",
  "TwoPosOneAnyTwoAny",
  "TwoPosTwoAnyOneAny",
  "TwoTwoOneAny",
  "TwoTwoTwoAny",
  "TwoTwoTwoPos",
  "TwoPosOneAnyTwoCloseAny",
  "TwoCloseOneTwoCloseAny",
  "TwoCloseTwoCloseOneAny",
  "TwoPosTwoCloseOneAny",
]
const twoWeeksPatterns: Readonly<string[]> = ["TwoCloseTwoClose", "TwoPosOnePos", "TwoPosTwoPos", "TwoCloseTwoClosePos", "TwoCloseTwoPos", "TwoCloseTwoAny"]

const twoWeeksOperations: Readonly<string[]> = ["MANUAL", "AUTO"]
const weeksToAdd: Readonly<number[]> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const weeksApart: Readonly<number[]> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const defaultEvents = [
  {
    Winning: [0, 0, 0, 0, 0] as WinningOrMachineEvent,
    Machine: [0, 0, 0, 0, 0] as WinningOrMachineEvent,
  },
  {
    Winning: [0, 0, 0, 0, 0] as WinningOrMachineEvent,
    Machine: [0, 0, 0, 0, 0] as WinningOrMachineEvent,
  },
  {
    Winning: [0, 0, 0, 0, 0] as WinningOrMachineEvent,
    Machine: [0, 0, 0, 0, 0] as WinningOrMachineEvent,
  },
]
const gameDetailsInitialData = {
  lastIndex: 0,
  nextIndex: 0,
  last2Events: defaultEvents,
}

const whereToSearch = ["Winning", "Machine"]
export { games, groups, threeWeeksPatterns, twoWeeksPatterns, ghanas, premmiers, weeksApart, weeksToAdd, twoWeeksOperations, defaultEvents, gameDetailsInitialData, whereToSearch }
