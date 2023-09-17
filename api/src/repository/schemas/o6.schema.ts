import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class O6 extends Game {}

export type O6Document = HydratedDocument<O6>

export const O6Schema = SchemaFactory.createForClass(O6)
