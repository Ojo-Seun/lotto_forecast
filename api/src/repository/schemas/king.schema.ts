import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class KING extends Game {}

export type KINGDocument = HydratedDocument<KING>

export const KINGSchema = SchemaFactory.createForClass(KING)
