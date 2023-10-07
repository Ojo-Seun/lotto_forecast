import { Injectable } from '@nestjs/common'
import { GameTypes, WhereToSearch } from '../games/interface/types'

@Injectable()
export class MatchFnService {
  /**
   * search for two one number at any position
   * @param targetEventObj
   * @param events
   * @param eventLevel
   * @param whereToSearch
   * @returns Promise<boolean>
   */
  async twoNumsAnyPos(targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch): Promise<boolean> {
    //event has five elements in the array
    const targetEvent = targetEventObj[whereToSearch] // Has five elements in the array
    // target may contains 0 which means absent of data.
    if (targetEvent[0] === 0) return false
    // Set will not store duplicate values
    const set = new Set([...event, ...targetEvent])
    // if set size is less than 9 then atleast two elements is the same in the two arrays
    return set.size < 9
  }

  /**
   * search for two numbers at any close position
   * @param targetEventObj
   * @param events
   * @param eventLevel
   * @param whereToSearch
   * @returns Promise<boolean>
   */
  async twoCloseNumsAnyPos(targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch): Promise<boolean> {
    //event Has five elements in the array
    const targetEvent = targetEventObj[whereToSearch] // Has five elements in the array
    // target may contains 0 which means absent of data.
    if (targetEvent[0] === 0) return false
    const set = new Set(targetEvent)

    for (let i = 0; i < event.length - 1; i++) {
      const num = event[i]
      const nextNum = event[i + 1]
      // Check if two nums present in the target array
      const itHasNum = set.has(num)
      const itHasNextNum = set.has(nextNum)
      if (itHasNum && itHasNextNum) {
        // Get the index of the two matched nums
        const numIndex = targetEvent.indexOf(num)
        const nextNumIndex = targetEvent.indexOf(nextNum)
        const indexDeff = Math.abs(numIndex - nextNumIndex)
        // If the defference = 1 then the two nums are close in the target array
        if (indexDeff === 1) {
          return true
        }
      }
    }

    return false
  }

  /**
   * search for one number at any position
   * @param targetEventObj
   * @param events
   * @param eventLevel
   * @param whereToSearch
   * @returns Promise<boolean>
   */

  async oneNumsAnyPos(targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch): Promise<boolean> {
    // Has five elements in the array
    const targetEvent = targetEventObj[whereToSearch] // Has five elements in the array
    // target may contains 0 which means absent of data.
    if (targetEvent[0] === 0) return false
    // Set will not store duplicate values
    const set = new Set([...event, ...targetEvent])
    // if set size is less than 10 then atleast one element is the same in the two array
    return set.size < 10
  }

  /**
   * search  two numbers
   * at the same position
   * @param targetEventObj
   * @param events
   * @param eventLevel
   * @param whereToSearch
   * @returns Promise<boolean>
   */

  async twoNumsCloseAtPos(targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch): Promise<boolean> {
    const targetEvent = targetEventObj[whereToSearch]
    // target may contains 0 which means absent of data.
    if (targetEvent[0] === 0) return false
    const length = targetEvent.length - 1
    for (let i = 0; i < length; i++) {
      const next = i + 1
      const isMatch = event[i] === targetEvent[i] && event[next] === targetEvent[next]
      if (isMatch) {
        return true
      }
    }

    return false
  }

  async oneNumsAtPos(targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch): Promise<boolean> {
    const targetEvent = targetEventObj[whereToSearch]
    // target may contains 0 which means absent of data.
    if (targetEvent[0] === 0) return false

    for (let i = 0; i < targetEvent.length; i++) {
      if (targetEvent[i] === event[i]) {
        return true
      }
    }

    return false
  }

  async twoAtPos(targetEventObj: GameTypes, event: number[], whereToSearch: WhereToSearch): Promise<boolean> {
    const targetEvent = targetEventObj[whereToSearch]
    // target may contains 0 which means absent of data.
    if (targetEvent[0] === 0) return false

    let matchCount = 0
    for (let i = 0; i < targetEvent.length; i++) {
      const isMatch = targetEvent[i] === event[i]
      if (isMatch) {
        matchCount++
      }
    }

    return matchCount >= 2
  }
}
