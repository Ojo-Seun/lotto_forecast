import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ type: String, required: true, name: 'name', minLength: 3, maxLength: 30 })
  name: string
  @ApiProperty({ type: String, required: true, name: 'email', maxLength: 30 })
  email: string
  @ApiProperty({ type: String, required: true, name: 'password', maxLength: 30, minLength: 8 })
  password: string
  @ApiProperty({ type: String, required: true, name: 'code', maxLength: 6 })
  code: string
}
