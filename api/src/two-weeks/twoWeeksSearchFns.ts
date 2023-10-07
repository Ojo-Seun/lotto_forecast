import { GameTypes, WhereToSearch } from 'src/games/interface/types'
import { TwoWeeksPayload } from './interface/types'
import { SearchFns, TwoWeeksMatchFns } from 'src/games/utils/types'
import { HttpException, HttpStatus } from '@nestjs/common'

export const twoWeeksSearchFns: SearchFns = {
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
async function searchUpward(game: GameTypes[], whereToSearch: WhereToSearch, queries: TwoWeeksPayload, matchFns: TwoWeeksMatchFns) {
  try {
    const { lastEvent, secondToLastEvent, weeksApart, numOfWeeksToAdd } = queries

    let result: GameTypes[] = []

    const length = game.length - 1

    for (let i = length; i >= weeksApart; i--) {
      const lastIndex = i
      const secondToLastIndex = i - weeksApart

      const isMatchLastEvent = await matchFns.isMatchLastEvent(game[lastIndex], lastEvent, whereToSearch)
      if (isMatchLastEvent) {
        const isMatchSecondEvent = await matchFns.isMatchSecondEvent(game[secondToLastIndex], secondToLastEvent, whereToSearch)
        if (isMatchSecondEvent) {
          game[lastIndex] = { ...extractPropertyFromObj(game[lastIndex]), weeksApart: 0, searchedIn: whereToSearch, direction: 'up' }
          game[secondToLastIndex] = { ...extractPropertyFromObj(game[secondToLastIndex]), weeksApart, searchedIn: whereToSearch, direction: 'up' }
          const start = secondToLastIndex - numOfWeeksToAdd < 0 ? 0 : secondToLastIndex - numOfWeeksToAdd
          const end = numOfWeeksToAdd + i > length ? game.length : numOfWeeksToAdd + i
          console.log({ i })

          const arr = game.slice(start, end)

          result = [...result, ...arr]
        }
      }
    }
    return result
  } catch (error) {
    console.log({ error: error.message, from: 'occured in searchUp function in TwoWeeksSearchService class' })

    throw new HttpException(error.massge, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Loop and find patterns in passed results start from 1st event
 * @param game
 * @param whereToSearch
 * @returns Promise<GameTyps[]>
 */
async function searchDownward(game: GameTypes[], whereToSearch: WhereToSearch, queries: TwoWeeksPayload, matchFns: TwoWeeksMatchFns) {
  let result: GameTypes[] = []
  try {
    const { lastEvent, secondToLastEvent, weeksApart, numOfWeeksToAdd } = queries

    const len = game.length - weeksApart

    for (let i = 0; i < len; i++) {
      const lastIndex = i
      const secondToLastIndex = i + weeksApart

      const isMatchLastEvent = await matchFns.isMatchLastEvent(game[lastIndex], lastEvent, whereToSearch)
      if (isMatchLastEvent) {
        const isMatchSecondEvent = await matchFns.isMatchSecondEvent(game[secondToLastIndex], secondToLastEvent, whereToSearch)
        if (isMatchSecondEvent) {
          game[lastIndex] = { ...extractPropertyFromObj(game[lastIndex]), weeksApart: 0, searchedIn: whereToSearch, direction: 'down' }
          game[secondToLastIndex] = { ...extractPropertyFromObj(game[secondToLastIndex]), weeksApart, searchedIn: whereToSearch, direction: 'down' }
          const start = i - numOfWeeksToAdd < 0 ? 0 : i - numOfWeeksToAdd
          const end = numOfWeeksToAdd + secondToLastIndex > game.length ? game.length : secondToLastIndex + numOfWeeksToAdd
          console.log({ start, end })
          const arr = game.slice(start, end)

          result = [...result, ...arr]
        }
      }
    }

    return result
  } catch (error: any) {
    console.log({ error: error.message, from: 'occured in searchDownward function in TwoWeeksSearchService class' })

    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
