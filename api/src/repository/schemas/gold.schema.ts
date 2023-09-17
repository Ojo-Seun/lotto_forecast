import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class GOLD extends Game {}

export type GOLDDocument = HydratedDocument<GOLD>

export const GOLDSchema = SchemaFactory.createForClass(GOLD)
