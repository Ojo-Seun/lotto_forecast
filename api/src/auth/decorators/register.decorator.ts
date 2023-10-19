import { applyDecorators, UsePipes, Post } from '@nestjs/common'
import { CreateUserPipe } from '../pipes/create-user.pipe'
import { CreateUserDto } from '../dto/create-user.dto'
import { ApiBody } from '@nestjs/swagger'

export function Register(path: string) {
  return applyDecorators(Post(path), UsePipes(CreateUserPipe), ApiBody({ type: CreateUserDto, required: true }))
}
