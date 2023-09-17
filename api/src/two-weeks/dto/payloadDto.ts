import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { twoWeeksPatterns } from '../utils/util'
import type { TwoWeeksPattern } from '../interface/types'
import { Games, Group, WinningOrMachineEvent } from 'src/games/interface/types'
import { games, groups } from 'src/games/utils/util'

export class TwoWeeksPaylaodDto {
  @ApiProperty({ type: [Number], required: true })
  secondToLastEvent: WinningOrMachineEvent
  @ApiProperty({ type: [Number], required: true })
  lastEvent: WinningOrMachineEvent
  @ApiProperty({ enum: games, enumName: 'game', required: true })
  game: Games

  @ApiProperty({ enum: groups, enumName: 'group', required: true })
  group: Group
  @ApiProperty({ type: Number, required: true })
  numOfWeeksToAdd: number
  @ApiProperty({ enum: twoWeeksPatterns, enumName: 'pattern', required: true })
  pattern: TwoWeeksPattern
  @ApiProperty({ type: Number, required: true })
  weeksApart: number
}
