import { ApiProperty } from '@nestjs/swagger'
import { twoWeeksPatterns } from '../utils/util'
import type { TwoWeeksPattern } from '../interface/types'
import { Games, Group, WhereToSearch, WinningOrMachineEvent } from 'src/games/interface/types'
import { games, groups } from 'src/games/utils/util'

export class TwoWeeksPayloadDto {
  @ApiProperty({ type: [Number], required: true, name: 'secondToLastEvent' })
  secondToLastEvent: WinningOrMachineEvent
  @ApiProperty({ type: [Number], required: true, name: 'lastEvent' })
  lastEvent: WinningOrMachineEvent
  @ApiProperty({ enum: games, enumName: 'game', required: true })
  game: Games

  @ApiProperty({ enum: groups, enumName: 'group', required: true })
  group: Group
  @ApiProperty({ type: Number, required: true, name: 'numOfWeeksToAdd' })
  numOfWeeksToAdd: number
  @ApiProperty({ enum: twoWeeksPatterns, enumName: 'pattern', required: true })
  pattern: TwoWeeksPattern
  @ApiProperty({ type: Number, required: true, name: 'weeksApart' })
  weeksApart: number
  @ApiProperty({ enum: ['Winning', 'Machine'], enumName: 'whereToExtract', required: true })
  whereToExtract: WhereToSearch
  @ApiProperty({ enum: games, enumName: 'gameToforecast', required: true })
  gameToForecast: Games
}
