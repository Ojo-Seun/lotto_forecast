import { applyDecorators, Post, UsePipes } from '@nestjs/common'
import { PasswordResetPipe } from '../pipes/pass-reset.pipe'
import { ApiBody } from '@nestjs/swagger'
import { ResetPassDto } from '../dto/reset-pass.dto'

export function ResetPassword() {
  return applyDecorators(Post('reset-password'), UsePipes(PasswordResetPipe), ApiBody({ type: ResetPassDto, required: true }))
}
