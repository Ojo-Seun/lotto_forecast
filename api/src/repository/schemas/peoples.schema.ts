import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class PEOPLES extends Game {}

export type PEOPLESDocument = HydratedDocument<PEOPLES>

export const PEOPLESSchema = SchemaFactory.createForClass(PEOPLES)
