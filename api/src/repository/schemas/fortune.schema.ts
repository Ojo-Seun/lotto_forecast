import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class FORTUNE extends Game {}

export type FORTUNEDocument = HydratedDocument<FORTUNE>

export const FORTUNESchema = SchemaFactory.createForClass(FORTUNE)
