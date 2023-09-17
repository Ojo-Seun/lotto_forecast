import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class METRO extends Game {}

export type METRODocument = HydratedDocument<METRO>

export const METROSchema = SchemaFactory.createForClass(METRO)
