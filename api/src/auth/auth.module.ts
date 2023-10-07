import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt/dist'
import { JwtModuleAsyncOptions } from 'config/index.config'
import { MailModule } from 'src/mail/mail.module'
import { MongooseModule } from '@nestjs/mongoose'
import { VerificationCode, VerificationCodeSchema } from './schema/verification-code.schema'

@Module({
  imports: [UsersModule, JwtModule.registerAsync(JwtModuleAsyncOptions), MailModule, MongooseModule.forFeature([{ name: VerificationCode.name, schema: VerificationCodeSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
