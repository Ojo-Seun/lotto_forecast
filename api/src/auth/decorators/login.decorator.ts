import { applyDecorators, UsePipes, Post } from '@nestjs/common'
import { LoginPipe } from '../pipes/login.pipe'
import { ApiBody } from '@nestjs/swagger'
import { LoginDto } from '../dto/login.dto'

export function Login() {
  return applyDecorators(Post('login'), UsePipes(LoginPipe), ApiBody({ type: LoginDto, required: true }))
}
