import { Injectable } from '@nestjs/common'
import { GameTypes, Games } from '../games/interface/types'
import { games, threeWeeksPatterns, twoWeeksPatterns } from '../games/utils/util'
import { TwoWeeksPayload } from 'src/two-weeks/interface/types'
import { ThreeWeeksPayload } from 'src/three-weeks/interface/types'

@Injectable()
export class Validators {
  private validateWeeksApart(weeksApart: number) {
    if (weeksApart < 1 || weeksApart > 20) {
      return { err: true, message: 'number of weeks apart must be 1 - 20' }
    }
  }

  private validateNofWeeksToaDD(num: number) {
    if (num < 6 || num > 20) {
      return { err: true, message: 'number of weeks to add must be 6 - 20' }
    }
  }

  private keysValidator(keys: string[], inputs: object) {
    const dataKeys = Object.keys(inputs)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      if (key !== dataKeys[index]) {
        return { err: true, message: `${key} must be provided` }
      }
    }
  }

  private patternValidator(pattern: string, patterns: string[]) {
    const valid = patterns.includes(pattern)
    if (!valid) {
      return { err: true, message: 'pattern name not valid' }
    }
  }

  private groupValidator(group: string) {
    const groups = ['GHANA', 'PREMMIER', 'ALL']
    const valid = groups.includes(group)
    if (!valid) {
      return { err: true, message: 'group name not valid' }
    }
  }

  private validateNumber = (num: number, key: string) => {
    const isNumber = /[0-9]{1,4}/.test(num.toString())

    if (isNumber) {
      return undefined
    }
    return { err: true, message: `${key} must be a valid number` }
  }

  private categoryValidator(category: string, key: string) {
    const isValidCategory = category === 'GHANA' || category === 'PREMMIER'
    if (!isValidCategory) {
      return { err: true, message: `${key} must be  "GHANA" or "PREMMIER"` }
    }
  }

  private dateValidator(date: string, key: string) {
    const reqex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}$/
    const isValid = reqex.test(date)
    if (!isValid) {
      return { err: true, message: `${key} must be  a valid date` }
    }
  }

  gameNameValidator(gameName: Games) {
    const valid = [...games, 'ALL'].includes(gameName)
    if (!valid) {
      return { err: true, message: 'game name not valid' }
    }
  }

  private validateEvent(event: number[]) {
    if (event?.length !== 5) return { err: true, message: 'event numbers must be 5' }

    for (let i = 0; i < event.length; i++) {
      const elem = event[i]

      const isNumber = /[0-9]{1,2}/.test(elem.toString())

      if (isNumber) {
        return undefined
      }
      return { err: true, message: 'numbers must be between 1 and 90' }
    }
  }

  dataEventValidator(event: GameTypes) {
    const isValidIndex = this.validateNumber(event.Index, 'Index')
    const isValidWT = this.validateNumber(event.WT, 'WT')
    const isValidMT = this.validateNumber(event.MT, 'MT')
    const isValidYear = this.validateNumber(event.Year, 'Year')
    const isValidEv = this.validateNumber(event.Ev, 'Ev')
    const isValidCategory = this.categoryValidator(event.Category, 'Category')
    const isValidDate = this.dateValidator(event.Date, 'Date')

    const isValidName = this.gameNameValidator(event.Name)
    const isValidWinningNums = this.validateEvent(event.Winning)
    const isValidMachineNums = this.validateEvent(event.Machine)
    const isError = isValidIndex ?? isValidName ?? isValidMachineNums ?? isValidWinningNums ?? isValidWT ?? isValidMT ?? isValidYear ?? isValidEv ?? isValidCategory ?? isValidDate

    if (isError?.err) {
      return isError
    }

    return null
  }

  threeWeekDataValidator(data: ThreeWeeksPayload) {
    const keys = ['thirdToLastEvent', 'secondToLastEvent', 'lastEvent', 'game', 'group', 'numOfWeeksToAdd', 'pattern']
    const isValidKeys = this.keysValidator(keys, data)
    const isValidThirdEvent = this.validateEvent(data['thirdToLastEvent'])
    const isValidSecondEvent = this.validateEvent(data['secondToLastEvent'])
    const isValidLastEvent = this.validateEvent(data['lastEvent'])
    const isValidGame = this.gameNameValidator(data['game'])
    const isValidGroup = this.groupValidator(data['group'])
    const isValidWtAdd = this.validateNofWeeksToaDD(data['numOfWeeksToAdd'])
    const isPattern = this.patternValidator(data['pattern'], threeWeeksPatterns as string[])
    const valid = isValidKeys ?? isValidThirdEvent ?? isValidSecondEvent ?? isValidGroup ?? isPattern ?? isValidGame ?? isValidWtAdd ?? isValidLastEvent

    if (valid?.err) {
      return { err: true, message: valid.message }
    }
    return { err: false, message: '' }
  }

  twoWeekDataValidator(data: TwoWeeksPayload) {
    const keys = ['secondToLastEvent', 'lastEvent', 'game', 'group', 'numOfWeeksToAdd', 'pattern', 'weeksApart']
    const isValidKeys = this.keysValidator(keys, data)
    const isValidSecondEvent = this.validateEvent(data['secondToLastEvent'])
    const isValidLastEvent = this.validateEvent(data['lastEvent'])
    const isValidGame = this.gameNameValidator(data['game'])
    const isValidGroup = this.groupValidator(data['group'])
    const isValidWtAdd = this.validateNofWeeksToaDD(data['numOfWeeksToAdd'])
    const isPattern = this.patternValidator(data['pattern'], twoWeeksPatterns as string[])
    const isValidWeeksApart = this.validateWeeksApart(data['weeksApart'])
    const valid = isValidKeys ?? isValidSecondEvent ?? isValidGroup ?? isPattern ?? isValidGame ?? isValidWtAdd ?? isValidLastEvent ?? isValidWeeksApart

    if (valid?.err) {
      return { err: true, message: valid.message }
    }
    return { err: false, message: '' }
  }
}