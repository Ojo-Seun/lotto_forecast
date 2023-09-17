import { IntersectionType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { Games, Group, WinningOrMachineEvent } from 'src/games/interface/types'
import { ThreeWeeksPattern } from '../interface/types'
import { threeWeeksPatterns } from '../utils/util'
import { games, groups } from 'src/games/utils/util'

export class ThreeWeeksPaylaodDto {
  @ApiProperty({ type: [Number], required: true })
  thirdToLastEvent: WinningOrMachineEvent
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
  @ApiProperty({ enum: threeWeeksPatterns, required: true })
  pattern: ThreeWeeksPattern
}
