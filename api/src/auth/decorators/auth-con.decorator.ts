import { applyDecorators, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

export function AuthCon() {
  return applyDecorators(Controller('auth'), ApiTags('Auth'))
}
