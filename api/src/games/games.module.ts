import { DynamicModule, Module, Provider } from '@nestjs/common'

import { MatchFnService } from './matchFns.service'
import { AutoSelectService } from './autoSelect.service'
import { SearchFns } from './utils/types'
import { RepoModule } from 'src/repository/repo.module'
import { RepoService } from 'src/repository/repo.service'
import { PayloadService } from 'src/global-utils/payload.service'
import { SearchService } from './search.service'

@Module({
  controllers: [],
})
export class GamesModule {
  static register(searchFns: SearchFns): DynamicModule {
    const searchService: Provider = {
      provide: SearchService,
      useFactory: (repoService: RepoService, payloadService: PayloadService) => {
        return new SearchService(repoService, payloadService, searchFns)
      },
      inject: [RepoService, PayloadService],
    }

    return {
      imports: [RepoModule],
      module: GamesModule,
      providers: [searchService, MatchFnService, AutoSelectService],
      exports: [searchService, MatchFnService, AutoSelectService, RepoModule],
    }
  }
}
