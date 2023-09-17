import { ConfigService } from '@nestjs/config'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'

const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get('DB_URI')!,
    }
  },
  inject: [ConfigService],
}

export default mongooseModuleAsyncOptions
