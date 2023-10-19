import { ApiProperty } from '@nestjs/swagger'

export class ResetPassDto {
  @ApiProperty({ type: String, required: true, name: 'email' })
  email: string
  @ApiProperty({ type: String, required: true, name: 'code' })
  code: string
  @ApiProperty({ type: String, required: true, name: 'password' })
  password: string
}
