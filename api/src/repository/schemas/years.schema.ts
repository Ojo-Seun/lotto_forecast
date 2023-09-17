import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Games } from 'src/games/interface/types'
import { games } from 'src/games/utils/util'
export type YEARSDocument = HydratedDocument<GAMEYEARS>

@Schema()
export class GAMEYEARS {
  @Prop({ enum: games, required: true, unique: true })
  Game: Games
  @Prop({ type: [Number], required: true })
  Years: number[]
}

export const GAMEYEARSSchema = SchemaFactory.createForClass(GAMEYEARS)
