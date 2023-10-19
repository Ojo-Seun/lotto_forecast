import { CreateUser, GameTypes, Games, Group, InsertMany, Login, ResetPass, SendEmail, SendPassResetCode } from "../utils/types"
import { games, ghanas, premmiers } from "../utils/util"

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/

const nameFormat = /^[A-Za-z]{3,30}(\s[A-Za-z]{3,30})?$/
const codeFormat = /^[0-9]{6}$/

const validateNumber = (num: number, key: string) => {
  const isNumber = /[0-9]{1,4}/.test(num.toString())

  if (isNumber) {
    return undefined
  }
  return { err: true, message: `${key} must be a valid number` }
}

const categoryValidator = (category: string, key: string) => {
  const isValidCategory = category === "GHANA" || category === "PREMMIER"
  if (!isValidCategory) {
    return { err: true, message: `${key} must be  "GHANA" or "PREMMIER"` }
  }
}

const dateValidator = (date: string, key: string) => {
  const reqex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}$/
  const isValid = reqex.test(date)
  if (!isValid) {
    return { err: true, message: `${key} must be  a valid date` }
  }
}

const gameNameValidator = (gameName: Games, group: string[]) => {
  const valid = group.includes(gameName)
  if (!valid) {
    return { err: true, message: "game name not valid" }
  }
}

const validateEvent = (event: number[]) => {
  if (event?.length !== 5) return { err: true, message: "event numbers must be 5" }

  for (let i = 0; i < event.length; i++) {
    const elem = event[i]

    const isNumber = /[0-9]{1,2}/.test(elem.toString())

    if (isNumber) {
      return undefined
    }
    return { err: true, message: "numbers must be between 1 and 90" }
  }
}

const dataEventValidator = (event: GameTypes) => {
  const isValidIndex = validateNumber(event.Index, "Index")
  const isValidWT = validateNumber(event.WT, "WT")
  const isValidMT = validateNumber(event.MT, "MT")
  const isValidYear = validateNumber(event.Year, "Year")
  const isValidEv = validateNumber(event.Ev, "Ev")
  const isValidCategory = categoryValidator(event.Category, "Category")
  const isValidDate = dateValidator(event.Date, "Date")

  const isValidName = gameNameValidator(event.Name, games as string[])
  const isValidWinningNums = validateEvent(event.Winning)
  const isValidMachineNums = validateEvent(event.Machine)
  const isError = isValidIndex ?? isValidName ?? isValidMachineNums ?? isValidWinningNums ?? isValidWT ?? isValidMT ?? isValidYear ?? isValidEv ?? isValidCategory ?? isValidDate

  return isError
}

const validategameEvents = (events: GameTypes[]) => {
  for (let i = 0; i < events.length; i++) {
    const event = events[i]

    const isValidEvent = dataEventValidator(event)
    return isValidEvent
  }
}
const validateYears = (years: number[]) => {
  for (let i = 0; i < years.length; i++) {
    const year = years[i]
    const isValidNums = validateNumber(year, "year")
    if (isValidNums?.err) {
      return isValidNums
    }
  }

  return null
}

const validateInsertManyOperationPayload = (data: InsertMany, group: Group) => {
  const gameNames = group === "PREMMIER" ? premmiers : ghanas
  const isValidName = gameNameValidator(data.game, gameNames as string[])
  const allEventsIsValid = validategameEvents(data.payload)
  const isValidYears = validateYears(data.years)
  const allInputsIsValid = isValidName ?? allEventsIsValid ?? isValidYears
  if (allEventsIsValid?.err) {
    return { ...allInputsIsValid }
  }

  return null
}

const validatEventeNum = (value: number) => {
  const isValidValue = value >= 1 && value <= 90
  if (isValidValue) {
    return true
  }

  return false
}

const insertOneInputsFromParentValidator = (game: Games, group: Group, nextIndex: number, lastEvent: GameTypes) => {
  // Check for undefined or null
  const noInputs = game && group && nextIndex && lastEvent?.Name
  if (!noInputs) {
    return { err: true, message: "all inputs must be provided" }
  }

  const isEqual = game === lastEvent.Name && group === lastEvent.Category
  if (!isEqual) {
    return { err: true, message: "game name or group name not equal" }
  }
  const gameNames = group === "PREMMIER" ? premmiers : ghanas

  const isValidCategory = categoryValidator(group, "group")
  const isValidGame = gameNameValidator(game, gameNames as string[])
  const isValidNextIndex = validateNumber(nextIndex, "nextIndex")
  const isValidEvent = dataEventValidator(lastEvent)

  const allInputsIsValid = isValidCategory ?? isValidGame ?? isValidNextIndex ?? isValidEvent
  if (allInputsIsValid?.err) {
    return { ...allInputsIsValid }
  }
  return null
}

function loginInputsValidator(payload: Login) {
  const keys = ["email", "password"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { email, password } = payload
  const isValidEmail = regexValidator("email", email, emailFormat)
  const isValidPassword = regexValidator("password", password, passFormat)
  const allIsValid = isValidEmail ?? isValidPassword
  if (allIsValid?.err) {
    return allIsValid
  }
  return null
}

function regexValidator(key: string, value: string, pattern: RegExp) {
  const isValid = pattern.test(value)
  if (isValid) return null
  return {
    err: true,
    message: `Invalid ${key} format`,
  }
}

function keysValidator(keys: string[], inputs: object) {
  const dataKeys = Object.keys(inputs)
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (key !== dataKeys[index]) {
      return { err: true, message: `${key} must be provided in correct orders` }
    }
  }
}

function registerInputsValidator(payload: CreateUser) {
  const keys = ["name", "email", "password", "code"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { name, email, password, code } = payload
  const isValidName = regexValidator("name", name, nameFormat)
  const isValidCode = regexValidator("code", code, codeFormat)
  const isValid = loginInputsValidator({ email, password })
  const allIsValid = isValidName ?? isValid ?? isValidCode
  return allIsValid
}

function sendMailInputsValidator(payload: SendEmail) {
  const keys = ["name", "email"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { name, email } = payload
  const isValidName = regexValidator("name", name, nameFormat)
  const isValidEmail = regexValidator("email", email, emailFormat)
  const allIsValid = isValidName ?? isValidEmail
  return allIsValid
}

function resetPassValidator(payload: ResetPass) {
  const keys = ["email", "code", "password"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { email, code, password } = payload
  const isValidCode = regexValidator("code", code, codeFormat)
  const isValid = loginInputsValidator({ email, password })
  const allIsValid = isValidCode ?? isValid
  return allIsValid
}

function sendPassResetCodeValidator(payload: SendPassResetCode) {
  const keys = ["email", "code"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { email, code } = payload
  const isValidCode = regexValidator("code", code, codeFormat)
  const isValidEmail = regexValidator("email", email, emailFormat)
  const allIsValid = isValidCode ?? isValidEmail
  return allIsValid
}

function useValidator() {
  return {
    sendPassResetCodeValidator,
    resetPassValidator,
    dataEventValidator,
    regexValidator,
    loginInputsValidator,
    registerInputsValidator,
    sendMailInputsValidator,
    validatEventeNum,
    insertOneInputsFromParentValidator,
    validateInsertManyOperationPayload,
  }
}

export default useValidator
