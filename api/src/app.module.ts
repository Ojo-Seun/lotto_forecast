import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config/dist'
import { ConfigOptions, ThrottlerOptions, MongooseModuleAsyncOptions } from 'config/index.config'
import { ThreeWeeksModule } from './three-weeks/three-weeks.module'
import { TwoWeeksModule } from './two-weeks/two-weeks.module'
import { DataModule } from './data/data.module'
import { UtilsModule } from './global-utils/utils.module'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [ThrottlerModule.forRoot([ThrottlerOptions]), ConfigModule.forRoot(ConfigOptions), ThreeWeeksModule, TwoWeeksModule, MongooseModule.forRootAsync(MongooseModuleAsyncOptions), DataModule, UtilsModule, EventEmitterModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
