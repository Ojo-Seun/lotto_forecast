import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ type: String, required: true, name: 'email', maxLength: 30 })
  email: string
  @ApiProperty({ type: String, required: true, name: 'password', maxLength: 30, minLength: 8 })
  password: string
}
