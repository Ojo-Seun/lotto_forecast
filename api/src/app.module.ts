import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config/dist'
import { ConfigOptions, ThrottlerOptions } from 'config/index.config'

@Module({
  imports: [ThrottlerModule.forRoot([ThrottlerOptions]), ConfigModule.forRoot(ConfigOptions)],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
