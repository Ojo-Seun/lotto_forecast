import { Injectable } from '@nestjs/common'
import { PatternFns, QueryTypes } from 'src/games/utils/types'

/**
 * Use to select game group to search.
 */

@Injectable()
export class GroupSelectionService {
  async search(queries: QueryTypes, patternFns: PatternFns) {
    const { game, group } = queries
    const isAll = (game as string) === 'ALL' && group === 'ALL' ? 'ALL' : null
    const isGhana = (game as string) === 'ALL' && group === 'GHANA' ? 'GHANA' : null
    const isPremmier = (game as string) === 'ALL' && group === 'PREMMIER' ? 'PREMMIER' : null
    const combine = isAll ?? isPremmier ?? isGhana

    switch (combine) {
      case 'ALL':
        const allRes = await patternFns.searchInAllGames(queries)
        return allRes
      case 'PREMMIER':
        const premmierRes = await patternFns.searchInPremmierGames(queries)
        return premmierRes
      case 'GHANA':
        const ghanaRes = await patternFns.searchInGhanaGames(queries)
        return ghanaRes
      default:
        const oneGameRes = await patternFns.searchInOneGame(queries)
        return oneGameRes
    }
  }
}
