import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { USER, UserPayload } from '../users/interface/user.interface'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose'
import { VerificationCode } from './schema/verification-code.schema'
import { Model } from 'mongoose'
import { MailService } from 'src/mail/mail.service'
import { SendEmailDto } from './dto/email.dto'
import { SendPassResetCodeDto } from './dto/send-pass-reset-code.dto'
import { ResetPassDto } from './dto/reset-pass.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService, private readonly configService: ConfigService, @InjectModel(VerificationCode.name) private readonly codeModel: Model<VerificationCode>, private readonly mailService: MailService) {}

  private async generateToken(payload: UserPayload) {
    const access_token = await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET'), expiresIn: '2h' })
    return access_token
  }

  private generateCode() {
    let code = ''
    for (let i = 0; i < 6; i++) {
      const elem = Math.floor(Math.random() * 10)
      code += elem
    }

    return code
  }

  private async verifyPassword(plainText: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(plainText, hash)
    return result
  }

  private async hashPass(password: string) {
    const salt = 0
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  async register(user: USER) {
    try {
      // Check if user already exist
      const isExist = await this.userService.findByEmail(user.email)
      if (isExist?._id) {
        throw new UnauthorizedException('email allready exist')
      }

      // Verify verification code
      const isValidCode = this.verifyVerificationCode(user.email, user.code)
      if (!isValidCode) {
        throw new UnauthorizedException({ success: false, message: 'verification code expired' })
      }

      // Hash password
      const hash = await this.hashPass(user.password)
      // Save new user
      const newUser = await this.userService.createUser({ ...user, password: hash })
      const payload = this.extractPayloadFromObj(newUser)
      const access_token = await this.generateToken(payload)
      // Delete verification code for this user
      await this.codeModel.deleteOne({ email: user.email, code: user.code })
      return {
        ...payload,
        access_token,
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async signIn(inputs: LoginDto) {
    try {
      const user = await this.userService.findByEmail(inputs.email)
      if (!user?._id) {
        throw new UnauthorizedException('Invalid email')
      }

      const result = await this.verifyPassword(inputs.password, user.password)
      if (!result) {
        throw new UnauthorizedException('Incorrect password')
      }
      const payload = this.extractPayloadFromObj(user)
      const access_token = await this.generateToken(payload)
      return {
        ...payload,
        access_token,
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
  private extractPayloadFromObj(obj: any): UserPayload {
    const paylod: UserPayload = {
      name: obj.name,
      email: obj.email,
      sub: obj._id,
      roles: obj.roles,
    }
    return paylod
  }

  private expiredIn() {
    const exp = 1000 * 60 * 5
    const iss = Date.now()
    return iss + exp
  }
  private async saveVerificationCode(email: string, code: string) {
    try {
      // Delete verification code for this email
      await this.codeModel.deleteOne({ email })
      // Get expiredIn
      const exp = this.expiredIn()
      // Create new verification code
      await this.codeModel.create({ email, code, exp })
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  private async verifyVerificationCode(email: string, code: string): Promise<boolean> {
    // Retrieve verification code
    const res = await this.codeModel.findOne({ email, code })
    if (!res?.code) {
      throw new UnauthorizedException('no verification code')
    }

    // Verify code expire?
    const now = Date.now()
    const isValidCode = res.exp < now
    if (!isValidCode) {
      return false
    }
    return true
  }

  private async sendCode(inputs: SendEmailDto, title: string) {
    const { name, email } = inputs

    const code = this.generateCode()
    try {
      const mailSent = await this.mailService.sendVerificationMail(email, title, name, code)
      if (mailSent?.messageId) {
        await this.saveVerificationCode(email, code)
        return {
          success: true,
          message: `Code Sent To ${email}`,
        }
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async sendRegistraionCode(payload: SendEmailDto) {
    // Check if user is already register
    const user = await this.userService.findByEmail(payload.email)
    if (user?.email) {
      throw new UnauthorizedException('This email is regitered allready')
    }

    try {
      const res = await this.sendCode(payload, 'Account Verification')
      return res
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async sendResetPasswordCode(payload: SendPassResetCodeDto) {
    // Check if user is exist
    const user = await this.userService.findByEmail(payload.email)
    if (!user?.email || user?.code !== payload.code) {
      throw new UnauthorizedException('email/code does not exist')
    }

    //Send verification code
    try {
      const res = await this.sendCode({ name: user.name, email: user.email }, 'Reset Password')
      return res
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async resetPassword(payload: ResetPassDto) {
    try {
      const { email, code, password } = payload
      // Verify verification code
      const isValidCode = await this.verifyVerificationCode(email, code)
      if (!isValidCode) {
        throw new UnauthorizedException({ success: false, message: 'verification code expired' })
      }
      // Hash password
      const hash = await this.hashPass(password)
      // Update user
      const updated = await this.userService.resetPassword({ email, code, password: hash })
      if (updated) {
        // Delete verification code for this user
        await this.codeModel.deleteOne({ email, code })
        return { success: true, message: 'password reset successfully' }
      }
    } catch (error) {
      throw new UnauthorizedException({ success: false, message: error.message })
    }
  }
}
