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
const groups: Readonly<string[]> = ["GHANA", "PREMMIER", "ALL"];

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
];
const twoWeeksPatterns: Readonly<string[]> = ["TwoCloseTwoClose", "TwoPosOnePos", "TwoPosTwoPos", "TwoCloseTwoAny"];

export { games, groups, threeWeeksPatterns, twoWeeksPatterns, ghanas, premmiers };
