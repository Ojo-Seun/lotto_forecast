import { applyDecorators, UsePipes, Post } from '@nestjs/common'
import { SendEmailPipe } from '../pipes/send-email.pipe'
import { ApiBody } from '@nestjs/swagger'
import { SendEmailDto } from '../dto/email.dto'

export function SendRegCode() {
  return applyDecorators(Post('send-registration-code'), UsePipes(SendEmailPipe), ApiBody({ type: SendEmailDto, required: true }))
}
