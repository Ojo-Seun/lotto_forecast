import { Module } from '@nestjs/common'
import { DataService } from './data.service'
import { DataController } from './data.controller'
import { RepoModule } from 'src/repository/repo.module'
import { GameYearsListener } from './listeners/game-years.listener'

@Module({
  imports: [RepoModule],
  controllers: [DataController],
  providers: [DataService, GameYearsListener],
})
export class DataModule {}
