import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class JACKPOT extends Game {}

export type JACKPOTDocument = HydratedDocument<JACKPOT>

export const JACKPOTSchema = SchemaFactory.createForClass(JACKPOT)
