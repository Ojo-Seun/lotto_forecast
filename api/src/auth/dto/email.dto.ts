import { ApiProperty } from '@nestjs/swagger'

export class SendEmailDto {
  @ApiProperty({ type: String, required: true, name: 'name' })
  name: string
  @ApiProperty({ type: String, required: true, name: 'email' })
  email: string
}
