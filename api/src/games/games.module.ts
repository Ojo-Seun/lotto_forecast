import { DynamicModule, Module, Provider, Scope } from '@nestjs/common'

import { MatchFnService } from './matchFns.service'
import { GroupSelectionService } from './group-selection.service'
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
    const SEARCHFns: Provider = {
      provide: 'SEARCH-FUNCTIONS',
      useValue: searchFns,
    }

    return {
      imports: [RepoModule],
      module: GamesModule,
      providers: [SearchService, MatchFnService, GroupSelectionService, SEARCHFns],
      exports: [SearchService, MatchFnService, GroupSelectionService, RepoModule],
    }
  }
}
