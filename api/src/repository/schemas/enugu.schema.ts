import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class ENUGU extends Game {}
export type ENUGUDocument = HydratedDocument<ENUGU>

export const ENUGUSchema = SchemaFactory.createForClass(ENUGU)
