import { ApiProperty } from '@nestjs/swagger'
import { Games } from 'src/games/interface/types'
import { games } from 'src/games/utils/util'

export class GetYearsDTO {
  @ApiProperty({ enum: games, required: true, enumName: 'game', name: 'name' })
  game: Games
}
