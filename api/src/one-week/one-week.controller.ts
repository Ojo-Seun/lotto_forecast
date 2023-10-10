import { Controller, Post, Body } from '@nestjs/common'
import { OneWeekService } from './one-week.service'
import { PayloadOneWeekDto } from './dto/payload-one-week.dto'
import { ApiTags } from '@nestjs/swagger'
import { Search } from './decorators/search.decorator'

@Controller('games/one-week')
@ApiTags('Forecast With One Week Passed Result')
export class OneWeekController {
  constructor(private readonly oneWeekService: OneWeekService) {}

  @Search()
  search(@Body('payload') payload: PayloadOneWeekDto) {
    return this.oneWeekService.search(payload)
  }
}
