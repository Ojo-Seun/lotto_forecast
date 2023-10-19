import { ConfigService } from '@nestjs/config'
import { JwtModuleAsyncOptions } from '@nestjs/jwt'

const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  useFactory: async (configervice: ConfigService) => {
    return {
      signOptions: { expiresIn: '2h' },
      secrete: configervice.get('JWT_SECRET'),
    }
  },
  global: true,
  inject: [ConfigService],
}

export default jwtModuleAsyncOptions
