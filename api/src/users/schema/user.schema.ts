import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Role, USER } from '../interface/user.interface'

export type UserDocument = HydratedDocument<User>

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/
const nameFormat = /^[A-Za-z]{3,30}(\s[A-Za-z]{3,30})?$/
const codeFormat = /^[0-9]{6}$/
export const roles: Readonly<Role[]> = ['USER', 'SUBSCRIBER', 'ADMINISTRATOR']

@Schema()
export class User implements USER {
  @Prop({ type: String, required: true, match: nameFormat })
  name: string
  @Prop({ type: String, required: true, unique: true, match: emailFormat, maxlength: 30 })
  email: string
  @Prop({ type: String, required: true, match: passFormat })
  password: string
  @Prop({ enum: roles, type: [String], required: true })
  roles: Role[]
  @Prop({ type: String, required: true, match: codeFormat })
  code: string
}

export const UserSchema = SchemaFactory.createForClass(User)
