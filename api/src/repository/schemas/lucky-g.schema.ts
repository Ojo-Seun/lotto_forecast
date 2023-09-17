import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class LUCKY_G extends Game {}

export type LUCKY_GDocument = HydratedDocument<LUCKY_G>

export const LUCKY_GSchema = SchemaFactory.createForClass(LUCKY_G)
