import { GameTypes, WhereToSearch } from 'src/games/interface/types'
import { SearchFns, ThreeWeeksMatchFns } from 'src/games/utils/types'
import { ThreeWeeksPayload } from './interface/types'
import { HttpException, HttpStatus } from '@nestjs/common'

export const threeWeeksSeachFns: SearchFns = {
  searchDownward,
  searchUpward,
}

function extractPropertyFromObj(obj: GameTypes) {
  const { Index, Winning, Machine, Ev, WT, MT, Date, Name, Category, _id, Year } = obj
  return {
    Index,
    Winning,
    Machine,
    Ev,
    WT,
    MT,
    Date,
    Name,
    Category,
    target: true,
    _id,
    Year,
  }
}

/**
 * Loop and find patterns in passed results start from last event
 * @param game
 * @param whereToSearch
 * @returns Promise<GameTyps[]>
 */
async function searchUpward(game: GameTypes[], whereToSearch: WhereToSearch, queries: ThreeWeeksPayload, matchFns: ThreeWeeksMatchFns) {
  try {
    const { lastEvent, secondToLastEvent, thirdToLastEvent, numOfWeeksToAdd } = queries

    let result: GameTypes[] = []

    const length = game.length - 1

    for (let i = length; i > 1; i--) {
      const lastIndex = i
      const secondToLastIndex = i - 1
      const thirdToLastIndex = i - 2

      const isMatchLastEvent = await matchFns.isMatchLastEvent(game[lastIndex], lastEvent, whereToSearch)
      if (isMatchLastEvent) {
        const isMatchSecondEvent = await matchFns.isMatchSecondEvent(game[secondToLastIndex], secondToLastEvent, whereToSearch)
        if (isMatchSecondEvent) {
          const isMatchThirdEvent = await matchFns.isMatchThirdEvent(game[thirdToLastIndex], thirdToLastEvent, whereToSearch)
          if (isMatchThirdEvent) {
            game[lastIndex] = { ...extractPropertyFromObj(game[lastIndex]), weeksApart: 0, searchedIn: whereToSearch, direction: 'up' }
            game[secondToLastIndex] = { ...extractPropertyFromObj(game[secondToLastIndex]), weeksApart: 1, searchedIn: whereToSearch, direction: 'up' }
            game[thirdToLastIndex] = { ...extractPropertyFromObj(game[thirdToLastIndex]), weeksApart: 2, searchedIn: whereToSearch, direction: 'up' }
            const start = thirdToLastIndex - numOfWeeksToAdd < 0 ? 0 : thirdToLastIndex - numOfWeeksToAdd
            const end = i + numOfWeeksToAdd > game.length ? game.length : i + numOfWeeksToAdd
            const arr = game.slice(start, end)

            result = [...result, ...arr]
          }
        }
      }
    }
    return result
  } catch (error) {
    console.log({ error: error.message, from: 'occured in searchUp function of ThreeWeeksSearchService class' })

    throw new HttpException(error.massge, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Loop and find patterns in passed results start from 1st event
 * @param game
 * @param whereToSearch
 * @returns Promise<GameTyps[]>
 */
async function searchDownward(game: GameTypes[], whereToSearch: WhereToSearch, queries: ThreeWeeksPayload, matchFns: ThreeWeeksMatchFns) {
  let result: GameTypes[] = []
  try {
    const { lastEvent, secondToLastEvent, thirdToLastEvent, numOfWeeksToAdd } = queries

    const len = game.length - 2

    for (let i = 0; i < len; i++) {
      const lastIndex = i
      const secondToLastIndex = i + 1
      const thirdToLastIndex = i + 2

      const isMatchLastEvent = await matchFns.isMatchLastEvent(game[lastIndex], lastEvent, whereToSearch)
      if (isMatchLastEvent) {
        const isMatchSecondEvent = await matchFns.isMatchSecondEvent(game[secondToLastIndex], secondToLastEvent, whereToSearch)
        if (isMatchSecondEvent) {
          const isMatchThirdEvent = await matchFns.isMatchThirdEvent(game[thirdToLastIndex], thirdToLastEvent, whereToSearch)
          if (isMatchThirdEvent) {
            game[lastIndex] = { ...extractPropertyFromObj(game[lastIndex]), weeksApart: 0, searchedIn: whereToSearch, direction: 'down' }
            game[secondToLastIndex] = { ...extractPropertyFromObj(game[secondToLastIndex]), weeksApart: 1, searchedIn: whereToSearch, direction: 'down' }
            game[thirdToLastIndex] = { ...extractPropertyFromObj(game[thirdToLastIndex]), weeksApart: 2, searchedIn: whereToSearch, direction: 'down' }
            const start = i - numOfWeeksToAdd < 0 ? 0 : i - numOfWeeksToAdd
            const end = numOfWeeksToAdd + thirdToLastIndex > game.length ? game.length : numOfWeeksToAdd + thirdToLastIndex
            const arr = game.slice(start, end)

            result = [...result, ...arr]
          }
        }
      }
    }

    return result
  } catch (error: any) {
    console.log({ error: error.message, from: 'occured in searchDownward function in ThreeWeeksSearchService class' })

    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
