import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Game } from './game.schema'

export class MSP extends Game {}

export type MSPDocument = HydratedDocument<MSP>

export const MSPSchema = SchemaFactory.createForClass(MSP)
