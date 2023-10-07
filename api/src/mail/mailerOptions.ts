import { ConfigService } from '@nestjs/config'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface'
import { join } from 'path'

export const mailerOptions: MailerAsyncOptions = {
  useFactory: async (configService: ConfigService) => {
    const isProduction = configService.get('NODE_ENV') === 'production'

    return {
      transport: {
        host: configService.get('HOST'),
        auth: {
          user: configService.get('USER'),
          pass: configService.get('PASS'),
        },
        sender: 'lotto.lens.com',
      },

      defaults: {
        from: '"No Reply" <lottolens2@gmail.com>',
      },
      template: {
        dir: './dist/_Mail/templates',
        adapter: new EjsAdapter(), // new EjsAdapter()
        options: {
          strict: isProduction,
        },
      },
      preview: !isProduction,
    }
  },

  inject: [ConfigService],
}
