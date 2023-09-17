import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class DIAMOND extends Game {}
export type DIAMONDDocument = HydratedDocument<DIAMOND>

export const DIAMONDSchema = SchemaFactory.createForClass(DIAMOND)
