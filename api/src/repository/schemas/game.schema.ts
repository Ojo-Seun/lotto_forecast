import { Schema, Prop } from '@nestjs/mongoose'
import type { GameTypes, Games, WinningOrMachineEvent, Category } from '../../games/interface/types'
import { games } from '../../games/utils/util'

const category = ['GHANA', 'PREMMIER']

// All games models inherit from this Schema

@Schema()
export class Game implements GameTypes {
  @Prop({ type: Number, required: [true, 'Index is required'], unique: true })
  Index: number
  @Prop({
    type: [Number],
    required: true,
  })
  Winning: WinningOrMachineEvent
  @Prop({
    type: [Number],
    required: true,
  })
  Machine: WinningOrMachineEvent
  @Prop({ type: String, enum: category, required: [true, 'Category is required'] })
  Category: Category
  @Prop({ type: String, required: true, enum: games })
  Name: Games
  @Prop({ type: Number, required: true })
  MT: number
  @Prop({ type: Number, required: true })
  WT: number
  @Prop({ type: Number, required: true })
  Year: number
  @Prop({ type: String, required: true })
  Date: string
  @Prop({ type: Number, required: true })
  Ev: number
}
