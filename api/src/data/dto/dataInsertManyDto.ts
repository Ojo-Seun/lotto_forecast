import { GameTypes, Games } from 'src/games/interface/types'
import { ApiProperty } from '@nestjs/swagger'
import { games } from 'src/games/utils/util'
import { GameDto } from './gameDto'

export class DataInsertManyDto {
  @ApiProperty({ required: true, enum: games, enumName: 'game' })
  game: Games
  @ApiProperty({ type: [GameDto], required: true })
  payload: GameTypes[]
  @ApiProperty({ type: [Number], required: true })
  years: number[]
}
