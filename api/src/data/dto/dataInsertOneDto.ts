import { GameTypes, Games } from 'src/games/interface/types'
import { ApiProperty } from '@nestjs/swagger'
import { games } from 'src/games/utils/util'
import { GameDto } from './gameDto'

export class DataInsertOneDto {
  @ApiProperty({ enumName: 'game', required: true, enum: games })
  game: Games
  @ApiProperty({ type: GameDto, required: true })
  payload: GameTypes
}
