import { ApiProperty } from '@nestjs/swagger'
import { Games, WhereToSearch } from 'src/games/interface/types'
import { games } from 'src/games/utils/util'

export class GetEventsDTO {
  @ApiProperty({ enum: games, required: true, enumName: 'game' })
  game: Games
  @ApiProperty({ type: Number, required: true, name: 'weeksApart' })
  weeksApart: number
  @ApiProperty({ enum: ['Winning', 'Machine'], required: true, name: 'whereToExtractData' })
  whereToExtractData: WhereToSearch
}
