import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class TOTA extends Game {}

export type TOTADocument = HydratedDocument<TOTA>

export const TOTASchema = SchemaFactory.createForClass(TOTA)
