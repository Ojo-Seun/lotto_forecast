import { applyDecorators, Post, UsePipes } from '@nestjs/common'
import { SendPassResetCodePipe } from '../pipes/send-pass-reset-code.pipe'
import { ApiBody } from '@nestjs/swagger'
import { SendPassResetCodeDto } from '../dto/send-pass-reset-code.dto'

export function SendPassResetCode() {
  return applyDecorators(Post('send-password-reset-code'), UsePipes(SendPassResetCodePipe), ApiBody({ type: SendPassResetCodeDto, required: true }))
}
