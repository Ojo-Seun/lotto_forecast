import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class SUPER extends Game {}

export type SUPERDocument = HydratedDocument<SUPER>

export const SUPERSchema = SchemaFactory.createForClass(SUPER)
