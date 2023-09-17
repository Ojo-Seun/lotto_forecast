import { GameTypes, Games } from "../utils/types";
import { games } from "../utils/util";

const validateNumber = (num: number, key: string) => {
  const isNumber = /[0-9]{1,4}/.test(num.toString());

  if (isNumber) {
    return undefined;
  }
  return { err: true, message: `${key} must be a valid number` };
};

const categoryValidator = (category: string, key: string) => {
  const isValidCategory = category === "GHANA" || category === "PREMMIER";
  if (!isValidCategory) {
    return { err: true, message: `${key} must be  "GHANA" or "PREMMIER"` };
  }
};

const dateValidator = (date: string, key: string) => {
  const reqex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}$/;
  const isValid = reqex.test(date);
  if (!isValid) {
    return { err: true, message: `${key} must be  a valid date` };
  }
};

const gameNameValidator = (gameName: Games) => {
  const valid = games.includes(gameName);
  if (!valid) {
    return { err: true, message: "game name not valid" };
  }
};

const validateEvent = (event: number[]) => {
  if (event?.length !== 5) return { err: true, message: "event numbers must be 5" };

  for (let i = 0; i < event.length; i++) {
    const elem = event[i];

    const isNumber = /[0-9]{1,2}/.test(elem.toString());

    if (isNumber) {
      return undefined;
    }
    return { err: true, message: "numbers must be between 1 and 90" };
  }
};

function useValidator() {
  const dataEventValidator = (event: GameTypes) => {
    const isValidIndex = validateNumber(event.Index, "Index");
    const isValidWT = validateNumber(event.WT, "WT");
    const isValidMT = validateNumber(event.MT, "MT");
    const isValidYear = validateNumber(event.Year, "Year");
    const isValidEv = validateNumber(event.Ev, "Ev");
    const isValidCategory = categoryValidator(event.Category, "Category");
    const isValidDate = dateValidator(event.Date, "Date");

    const isValidName = gameNameValidator(event.Name);
    const isValidWinningNums = validateEvent(event.Winning);
    const isValidMachineNums = validateEvent(event.Machine);
    const isError = isValidIndex ?? isValidName ?? isValidMachineNums ?? isValidWinningNums ?? isValidWT ?? isValidMT ?? isValidYear ?? isValidEv ?? isValidCategory ?? isValidDate;

    if (isError?.err) {
      return isError;
    }

    return null;
  };

  return [dataEventValidator];
}

export default useValidator;
