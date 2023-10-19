import { ApiProperty } from '@nestjs/swagger'
import { Games } from 'src/games/interface/types'
import { games } from 'src/games/utils/util'

export class GetEventsDTO {
  @ApiProperty({ enum: games, required: true, enumName: 'game' })
  game: Games
  @ApiProperty({ type: Number, required: true, name: 'weeksApart' })
  weeksApart: number
}
