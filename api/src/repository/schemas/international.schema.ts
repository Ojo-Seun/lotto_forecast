import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class INTERNATIONAL extends Game {}

export type INTERNATIONALDocument = HydratedDocument<INTERNATIONAL>

export const INTERNATIONALSchema = SchemaFactory.createForClass(INTERNATIONAL)
