import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { mailerOptions } from './mailerOptions'
import { MailService } from './mail.service'
@Module({
  imports: [MailerModule.forRootAsync(mailerOptions)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
