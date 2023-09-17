import { ApiProperty } from '@nestjs/swagger'
import { Category, Games, WinningOrMachineEvent } from 'src/games/interface/types'
import { games } from 'src/games/utils/util'

const category = ['PREMMIER', 'GHANA']
export class GameDto {
  @ApiProperty({ enum: games, enumName: 'Name', required: true })
  Name: Games
  @ApiProperty({ type: Number, required: true })
  Index: number
  @ApiProperty({ type: Number, required: true })
  WT: number
  @ApiProperty({ type: Number, required: true })
  MT: number
  @ApiProperty({ type: String, required: true })
  Date: string
  @ApiProperty({ type: [Number], required: true })
  Winning: WinningOrMachineEvent
  @ApiProperty({ type: [Number], required: true })
  Machine: WinningOrMachineEvent
  @ApiProperty({ enum: category, required: true, enumName: 'Category' })
  Category: Category
  @ApiProperty({ type: Number, required: true })
  Year: number
}
