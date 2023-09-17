import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class MARK_II extends Game {}

export type MARK_IIDocument = HydratedDocument<MARK_II>

export const MARK_IISchema = SchemaFactory.createForClass(MARK_II)
