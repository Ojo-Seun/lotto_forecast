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

  async register(user: USER) {
    try {
      // Retrieve verification code
      const res = await this.codeModel.findOne({ email: user.email, code: user.code }, { code: 1, _id: 0 })
      if (!res?.code) {
        throw new UnauthorizedException('valid verification code required')
      }

      // Check if user already exist
      const isExist = await this.userService.findByEmail(user.email)
      if (isExist?._id) {
        throw new UnauthorizedException('email allready exist')
      }

      // Hash password
      const hash = await bcrypt.hash(user.password, 10)
      // Save new user
      const newUser = await this.userService.createUser({ ...user, password: hash })
      const payload = this.extractPayloadFromObj(newUser)
      const access_token = await this.generateToken(payload)
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

  private async saveVerificationCode(email: string, code: string) {
    try {
      // Delete verification code for this email
      await this.codeModel.deleteOne({ email })
      await this.codeModel.create({ email, code })
    } catch (error) {}
  }

  async sendMail(inputs: SendEmailDto) {
    const { name, email } = inputs
    const code = this.generateCode()
    try {
      const mailSent = await this.mailService.sendVerificationMail(email, 'Account Verification', name, code)
      if (mailSent) {
        await this.saveVerificationCode(email, code)
        return {
          success: true,
          message: `Verification Code Sent To ${email}`,
        }
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
