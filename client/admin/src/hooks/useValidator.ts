import { GameTypes, Games, Group, InsertMany } from "../utils/types";
import { games, ghanas, premmiers } from "../utils/util";

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

const gameNameValidator = (gameName: Games, group: string[]) => {
  const valid = group.includes(gameName);
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

const dataEventValidator = (event: GameTypes) => {
  const isValidIndex = validateNumber(event.Index, "Index");
  const isValidWT = validateNumber(event.WT, "WT");
  const isValidMT = validateNumber(event.MT, "MT");
  const isValidYear = validateNumber(event.Year, "Year");
  const isValidEv = validateNumber(event.Ev, "Ev");
  const isValidCategory = categoryValidator(event.Category, "Category");
  const isValidDate = dateValidator(event.Date, "Date");

  const isValidName = gameNameValidator(event.Name, games as string[]);
  const isValidWinningNums = validateEvent(event.Winning);
  const isValidMachineNums = validateEvent(event.Machine);
  const isError = isValidIndex ?? isValidName ?? isValidMachineNums ?? isValidWinningNums ?? isValidWT ?? isValidMT ?? isValidYear ?? isValidEv ?? isValidCategory ?? isValidDate;

  if (isError?.err) {
    return isError;
  }

  return null;
};

const validategameEvents = (events: GameTypes[]) => {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    const isValidEvent = dataEventValidator(event);
    if (isValidEvent?.err) {
      console.log(event);
      return { ...isValidEvent };
    }
  }

  return null;
};

const validateYears = (years: number[]) => {
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const isValidNums = validateNumber(year, "year");
    if (isValidNums?.err) {
      return {
        ...isValidNums,
      };
    }
  }

  return null;
};

const validateInsertManyOperationPayload = (data: InsertMany, group: Group) => {
  const gameNames = group === "PREMMIER" ? premmiers : ghanas;
  const isValidName = gameNameValidator(data.game, gameNames as string[]);
  const allEventsIsValid = validategameEvents(data.payload);
  const isValidYears = validateYears(data.years);
  const allInputsIsValid = isValidName ?? allEventsIsValid ?? isValidYears;
  if (allEventsIsValid?.err) {
    return { ...allInputsIsValid };
  }

  return null;
};

const validatEventeNum = (value: number) => {
  const isValidValue = value >= 1 && value <= 90;
  if (isValidValue) {
    return true;
  }

  return false;
};

const insertOneInputsFromParentValidator = (game: Games, group: Group, nextIndex: number, lastEvent: GameTypes) => {
  // Check for undefined or null
  const noInputs = game && group && nextIndex && lastEvent?.Name;
  if (!noInputs) {
    return { err: true, message: "all inputs must be provided" };
  }

  const isEqual = game === lastEvent.Name && group === lastEvent.Category;
  if (!isEqual) {
    return { err: true, message: "game name or group name not equal" };
  }
  const gameNames = group === "PREMMIER" ? premmiers : ghanas;

  const isValidCategory = categoryValidator(group, "group");
  const isValidGame = gameNameValidator(game, gameNames as string[]);
  const isValidNextIndex = validateNumber(nextIndex, "nextIndex");
  const isValidEvent = dataEventValidator(lastEvent);

  const allInputsIsValid = isValidCategory ?? isValidGame ?? isValidNextIndex ?? isValidEvent;
  if (allInputsIsValid?.err) {
    return { ...allInputsIsValid };
  }
  return null;
};

function useValidator() {
  return { dataEventValidator, validatEventeNum, insertOneInputsFromParentValidator, validateInsertManyOperationPayload };
}

export default useValidator;
