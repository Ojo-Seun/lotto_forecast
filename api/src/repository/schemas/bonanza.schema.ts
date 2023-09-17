import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export type BONANZADocument = HydratedDocument<BONANZA>

export class BONANZA extends Game {}

export const BONANZASchema = SchemaFactory.createForClass(BONANZA)
