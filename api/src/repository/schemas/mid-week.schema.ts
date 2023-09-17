import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class MID_WEEK extends Game {}

export type MID_WEEKDocument = HydratedDocument<MID_WEEK>

export const MID_WEEKSchema = SchemaFactory.createForClass(MID_WEEK)
