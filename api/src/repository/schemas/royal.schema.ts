import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class ROYAL extends Game {}

export type ROYALDocument = HydratedDocument<ROYAL>

export const ROYALSchema = SchemaFactory.createForClass(ROYAL)
