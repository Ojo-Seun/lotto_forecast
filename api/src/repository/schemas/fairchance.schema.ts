import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class FAIR_CHANCE extends Game {}

export type FAIR_CHANCEDocument = HydratedDocument<FAIR_CHANCE>

export const FAIR_CHANCESchema = SchemaFactory.createForClass(FAIR_CHANCE)
