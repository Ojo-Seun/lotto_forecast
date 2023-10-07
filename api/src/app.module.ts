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
import { GamesModule } from './games/games.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [ThrottlerModule.forRoot([ThrottlerOptions]), MailModule, ConfigModule.forRoot(ConfigOptions), ThreeWeeksModule, TwoWeeksModule, MongooseModule.forRootAsync(MongooseModuleAsyncOptions), GamesModule, DataModule, UtilsModule, EventEmitterModule.forRoot(), AuthModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
