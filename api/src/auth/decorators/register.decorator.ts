import { applyDecorators, UsePipes } from '@nestjs/common'
import { CreateUserPipe } from '../pipes/create-user.pipe'
import { CreateUserDto } from '../dto/create-user.dto'
import { ApiBody } from '@nestjs/swagger'

export function Register() {
  return applyDecorators(UsePipes(CreateUserPipe), ApiBody({ type: CreateUserDto, required: true }))
}
