import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const codeFormat = /^[0-9]{6}$/

@Schema()
export class VerificationCode {
  @Prop({ type: String, required: true, unique: true, match: emailFormat, maxlength: 30 })
  email: string

  @Prop({ type: String, required: true, match: codeFormat })
  code: string
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode)
