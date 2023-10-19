import { Controller, Post, Body, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { ErrorObjectService } from 'src/global-utils/error-object.service'
import { SendEmailDto } from './dto/email.dto'
import { ApiTags } from '@nestjs/swagger'
import { Role } from 'src/users/interface/user.interface'
import { roles } from 'src/users/schema/user.schema'
import { Register } from './decorators/register.decorator'
import { Login } from './decorators/login.decorator'
import { SendRegCode } from './decorators/send-email.decorator'
import { SendPassResetCodeDto } from './dto/send-pass-reset-code.dto'
import { ResetPassDto } from './dto/reset-pass.dto'
import { SendPassResetCode } from './decorators/send-reset-pass-code.decorator'
import { ResetPassword } from './decorators/reset-password.decorator'
import { AuthCon } from './decorators/auth-con.decorator'

@AuthCon()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Register('register-user')
  async registerUser(@Body('payload') payload: CreateUserDto) {
    try {
      const user = { ...payload, roles: ['USER'] as Role[] }
      return await this.authService.register(user)
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }

  @Register('register-admin')
  async registerAdmin(@Body('payload') payload: CreateUserDto) {
    try {
      const user = { ...payload, roles: roles as Role[] }
      return await this.authService.register(user)
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }

  @Login()
  async signIn(@Body('payload') payload: LoginDto) {
    try {
      return await this.authService.signIn(payload)
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }

  @SendRegCode()
  async sendRegistrationCode(@Body('payload') payload: SendEmailDto) {
    try {
      return this.authService.sendRegistraionCode(payload)
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }

  @SendPassResetCode()
  async sendResetPasswordCode(@Body('payload') payload: SendPassResetCodeDto) {
    try {
      return await this.authService.sendResetPasswordCode(payload)
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }

  @ResetPassword()
  async resetPassword(@Body('payload') payload: ResetPassDto) {
    try {
      return await this.authService.resetPassword(payload)
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }
}
