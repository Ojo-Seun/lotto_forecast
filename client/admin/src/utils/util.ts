import { WinningOrMachineEvent } from "./types";

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
];
const groups: Readonly<string[]> = ["GHANA", "PREMMIER"];

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
];
const ghanas: Readonly<string[]> = ["NATIONAL", "BONANZA", "LUCKY G", "FORTUNE", "MID WEEK", "MSP"];

const dafauttEvents = [
  { Winning: [0, 0, 0, 0, 0] as WinningOrMachineEvent, Machine: [0, 0, 0, 0, 0] as WinningOrMachineEvent },
  { Winning: [0, 0, 0, 0, 0] as WinningOrMachineEvent, Machine: [0, 0, 0, 0, 0] as WinningOrMachineEvent },
];
const gameDetailsInitialData = { lastIndex: 0, nextIndex: 0, last2Events: dafauttEvents };
const operations = ["Insert Many", "Insert One"];

export { games, groups, ghanas, premmiers, gameDetailsInitialData, operations };
