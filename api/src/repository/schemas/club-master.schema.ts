import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export type CLUB_MASTERDocument = HydratedDocument<CLUB_MASTER>
export class CLUB_MASTER extends Game {}

export const CLUB_MASTERSchema = SchemaFactory.createForClass(CLUB_MASTER)
