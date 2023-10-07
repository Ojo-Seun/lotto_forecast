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
import { SendEmail } from './decorators/send-email.decorator'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly errObjService: ErrorObjectService) {}

  @Post('register-user')
  @Register()
  async registerUser(@Body('payload') payload: CreateUserDto) {
    try {
      const user = { ...payload, roles: ['USER'] as Role[] }
      return await this.authService.register(user)
    } catch (error) {
      const { response, status } = this.errObjService.error('registration failed', error.message, HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException({ response, status })
    }
  }

  @Post('register-admin')
  @Register()
  async registerAdmin(@Body('payload') payload: CreateUserDto) {
    try {
      const user = { ...payload, roles: roles as Role[] }
      return await this.authService.register(user)
    } catch (error) {
      const { response, status } = this.errObjService.error('registration failed', error.message, HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException({ response, status })
    }
  }

  @Post('login')
  @Login()
  async signIn(@Body('payload') payload: LoginDto) {
    try {
      return await this.authService.signIn(payload)
    } catch (error) {
      const { response, status } = this.errObjService.error('login failed', error.message, HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException({ response, status })
    }
  }
  @Post('send-mail')
  @SendEmail()
  async sendMail(@Body('payload') payload: SendEmailDto) {
    try {
      return this.authService.sendMail(payload)
    } catch (error) {
      const { response, status } = this.errObjService.error('code not sent', error.message, HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException({ response, status })
    }
  }
}
