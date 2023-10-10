import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { oneWeekPatterns } from '../utils/repo'
import type { OneWeekEvent, OneWeekPattern } from '../interface/types'
import { Games, Group } from 'src/games/interface/types'
import { games, groups } from 'src/games/utils/util'
import { GameDto } from 'src/data/dto/gameDto'

export class PayloadOneWeekDto {
  @ApiProperty({ type: PickType<GameDto, 'Winning' | 'Machine'>, required: true, name: 'lastEvent' })
  lastEvent: OneWeekEvent
  @ApiProperty({ enum: games, enumName: 'game', required: true })
  game: Games

  @ApiProperty({ enum: groups, enumName: 'group', required: true })
  group: Group
  @ApiProperty({ type: Number, required: true, name: 'numOfWeeksToAdd' })
  numOfWeeksToAdd: number
  @ApiProperty({ enum: oneWeekPatterns, enumName: 'pattern', required: true })
  pattern: OneWeekPattern

  @ApiProperty({ enum: games, enumName: 'gameToforecast', required: true })
  gameToForecast: Games
}
