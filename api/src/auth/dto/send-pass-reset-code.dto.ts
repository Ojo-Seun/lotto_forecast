import { ApiProperty } from '@nestjs/swagger'

export class SendPassResetCodeDto {
  @ApiProperty({ type: String, required: true, name: 'email' })
  email: string
  @ApiProperty({ type: String, required: true, name: 'code' })
  code: string
}
