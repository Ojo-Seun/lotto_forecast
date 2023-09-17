import { Injectable } from '@nestjs/common'
import { games, ghanas, premmiers, threeWeeksPatterns, twoWeeksPatterns, groups, lastAndThirdWeeksPatterns } from '../games/utils/util'

@Injectable()
export class PayloadService {
  games = games
  ghanas = ghanas
  premmiers = premmiers
  threeWeeksPatterns = threeWeeksPatterns
  twoWeeksPatterns = twoWeeksPatterns
  lastAndThirdWeeksPatterns = lastAndThirdWeeksPatterns
  groups = groups
  constructor() {}

  getGames() {
    return this.games
  }

  getGhanas() {
    return this.ghanas
  }

  getPremmiers() {
    return this.premmiers
  }

  getThreeWeeksPatterns() {
    return this.threeWeeksPatterns
  }

  getTwoWeeksPatterns() {
    return this.twoWeeksPatterns
  }

  getLastAndTirdWeeksPatterns() {
    return this.lastAndThirdWeeksPatterns
  }

  getGroups() {
    return this.groups
  }
}
