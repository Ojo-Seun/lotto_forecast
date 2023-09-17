import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type BINGODocument = HydratedDocument<BINGO>

import { Game } from './game.schema'

export class BINGO extends Game {}

export const BINGOSchema = SchemaFactory.createForClass(BINGO)
