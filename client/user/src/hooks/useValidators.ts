import React from "react"
import { games, threeWeeksPatterns, twoWeeksPatterns } from "../utils/repo"
import { CreateUser, EmailVerification, Games, Login, SendEmail, ThreeWeeksPayload, TwoWeeksPayload, WhereToSearch } from "../utils/type"

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
const nameFormat = /^[A-Za-z]{3,30}(\s[A-Za-z]{3,30})?$/
const codeFormat = /^[0-9]{6}$/

const validatEventeNum = (value: number) => {
  const isValidValue = value >= 1 && value <= 90
  if (isValidValue) {
    return true
  }

  return false
}
function patternValidator(pattern: string, patterns: string[]) {
  const valid = patterns.includes(pattern)
  if (!valid) {
    return { err: true, message: "pattern name not valid" }
  }
}

function groupValidator(group: string) {
  const groups = ["GHANA", "PREMMIER", "ALL"]
  const valid = groups.includes(group)
  if (!valid) {
    return { err: true, message: "group name not valid" }
  }
}

function validateWeeksApart(weeksApart: number) {
  if (weeksApart < 1 || weeksApart > 20) {
    return { err: true, message: "number of weeks apart must be 1 - 20" }
  }
}

function validateNofWeeksToaDD(num: number) {
  if (num < 1 || num > 20) {
    return { err: true, message: "number of weeks to add must be 1 - 20" }
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

function gameNameValidator(gameName: string, group: string[]) {
  const valid = group.includes(gameName)
  if (!valid) {
    return { err: true, message: "game name not valid" }
  }
}

function validateEvent(event: number[]) {
  if (event?.length !== 5) return { err: true, message: "event numbers must be 5" }

  for (let i = 0; i < event.length; i++) {
    const elem = event[i]

    const isNumber = validatEventeNum(elem)

    if (isNumber) {
      return undefined
    }
    return { err: true, message: "numbers must be between 1 and 90" }
  }
}

function validateWhereToExtract(where: WhereToSearch) {
  if (where === "Winning" || where === "Machine") {
    return null
  }
  return { err: true, message: "where to extract is required" }
}

function threeWeekDataValidator(data: ThreeWeeksPayload) {
  const keys = ["thirdToLastEvent", "secondToLastEvent", "lastEvent", "game", "group", "numOfWeeksToAdd", "pattern", "gameToForecast"]
  const isValidKeys = keysValidator(keys, data)
  const isValidThirdEvent = validateEvent(data["thirdToLastEvent"])
  const isValidSecondEvent = validateEvent(data["secondToLastEvent"])
  const isValidLastEvent = validateEvent(data["lastEvent"])
  const isValidGame = gameNameValidator(data["game"], [...games, "ALL"])
  const isValidGroup = groupValidator(data["group"])
  const isValidWtAdd = validateNofWeeksToaDD(data["numOfWeeksToAdd"])
  const isPattern = patternValidator(data["pattern"], threeWeeksPatterns as string[])
  const isValidGameToForecast = gameNameValidator(data["gameToForecast"], games as string[])
  const valid = isValidKeys ?? isValidThirdEvent ?? isValidSecondEvent ?? isValidGroup ?? isPattern ?? isValidGame ?? isValidWtAdd ?? isValidLastEvent ?? isValidGameToForecast

  if (valid?.err) {
    return { err: true, message: valid.message }
  }
  return { err: false, message: "" }
}

function twoWeekDataValidator(data: TwoWeeksPayload) {
  const keys = ["secondToLastEvent", "lastEvent", "game", "group", "numOfWeeksToAdd", "pattern", "weeksApart", "whereToExtract", "gameToForecast"]
  const isValidKeys = keysValidator(keys, data)
  const isValidSecondEvent = validateEvent(data["secondToLastEvent"])
  const isValidLastEvent = validateEvent(data["lastEvent"])
  const isValidGame = gameNameValidator(data["game"], [...games, "ALL"])
  const isValidGroup = groupValidator(data["group"])
  const isValidWtAdd = validateNofWeeksToaDD(data["numOfWeeksToAdd"])
  const isPattern = patternValidator(data["pattern"], twoWeeksPatterns as string[])
  const isValidWeeksApart = validateWeeksApart(data["weeksApart"])
  const isValidWhereToExtract = validateWhereToExtract(data["whereToExtract"])
  const isValidgameToForecast = gameNameValidator(data["gameToForecast"], games as string[])
  const valid = isValidKeys ?? isValidSecondEvent ?? isValidGroup ?? isPattern ?? isValidGame ?? isValidWtAdd ?? isValidLastEvent ?? isValidWeeksApart ?? isValidWhereToExtract ?? isValidgameToForecast

  if (valid?.err) {
    return { err: true, message: valid.message }
  }
  return { err: false, message: "" }
}

function regexValidator(key: string, value: string, pattern: RegExp) {
  const isValid = pattern.test(value)
  if (isValid) return null
  return {
    err: true,
    message: `Invalid ${key} format`,
  }
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

function registerInputsValidator(payload: CreateUser) {
  const keys = ["name", "email", "password"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { name, email, password } = payload
  const isValidName = regexValidator("name", name, nameFormat)
  const isValid = loginInputsValidator({ email, password })
  const allIsValid = isValidName ?? isValid
  if (allIsValid?.err) {
    return allIsValid
  }
  return null
}

function sendMailInputsValidator(payload: SendEmail) {
  const keys = ["name", "email"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { name, email } = payload
  const isValidName = regexValidator("name", name, nameFormat)
  const isValidEmail = regexValidator("email", email, emailFormat)
  const allIsValid = isValidName ?? isValidEmail
  if (allIsValid?.err) {
    return allIsValid
  }
  return null
}

function verifyEmailValidator(payload: EmailVerification) {
  const keys = ["email", "code"]
  const isValidKeys = keysValidator(keys, payload)
  if (isValidKeys?.err) return isValidKeys
  const { email, code } = payload
  const isValidEmail = regexValidator("email", email, emailFormat)
  const isValidCode = regexValidator("code", code, codeFormat)
  const allIsValid = isValidEmail ?? isValidCode
  if (allIsValid?.err) {
    return allIsValid
  }
  return null
}

function useValidators() {
  return { validatEventeNum, twoWeekDataValidator, threeWeekDataValidator, loginInputsValidator, registerInputsValidator, sendMailInputsValidator, verifyEmailValidator }
}

export default useValidators
