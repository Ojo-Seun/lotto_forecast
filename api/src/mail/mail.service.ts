import { Injectable, UnauthorizedException } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationMail(to: string, subject: string, name: string, code: string) {
    try {
      const res = await this.mailerService.sendMail({
        from: 'lotto.lens@yahoo.com',

        to: to,
        subject: subject,
        template: './message',
        context: {
          name: name.toLocaleUpperCase(),
          code,
        },
      })

      return {
        ...res,
      }
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('code not sent, is your email valid?')
    }
  }
}
