import { Controller, Post, Body } from '@nestjs/common'
import { OneWeekService } from './one-week.service'
import { PayloadOneWeekDto } from './dto/payload-one-week.dto'
import { ApiTags } from '@nestjs/swagger'
import { Search } from './decorators/search.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('games/one-week')
@ApiTags('Forecast With One Week Passed Result')
@Auth('SUBSCRIBER')
export class OneWeekController {
  constructor(private readonly oneWeekService: OneWeekService) {}

  @Search()
  search(@Body('payload') payload: PayloadOneWeekDto) {
    return this.oneWeekService.search(payload)
  }
}
