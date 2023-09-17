import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class LUCKY extends Game {}

export type LUCKYDocument = HydratedDocument<LUCKY>

export const LUCKYSchema = SchemaFactory.createForClass(LUCKY)
