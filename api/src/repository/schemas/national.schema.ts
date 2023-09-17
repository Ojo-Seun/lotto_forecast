import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class NATIONAL extends Game {}

export type NATIONALDocument = HydratedDocument<NATIONAL>

export const NATIONALSchema = SchemaFactory.createForClass(NATIONAL)
