import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class VAG extends Game {}

export type VAGDocument = HydratedDocument<VAG>

export const VAGSchema = SchemaFactory.createForClass(VAG)
