import { applyDecorators, UsePipes } from '@nestjs/common'
import { SendEmailPipe } from '../pipes/send-email.pipe'
import { ApiBody } from '@nestjs/swagger'
import { SendEmailDto } from '../dto/email.dto'

export function SendEmail() {
  return applyDecorators(UsePipes(SendEmailPipe), ApiBody({ type: SendEmailDto, required: true }))
}
