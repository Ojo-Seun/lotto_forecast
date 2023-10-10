import { applyDecorators, Post, UsePipes } from '@nestjs/common/decorators'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { OneWeekPayloadPipe } from '../pipes/one-week-payload.pipe'
import { PayloadOneWeekDto } from '../dto/payload-one-week.dto'

export function Search() {
  return applyDecorators(Post('search'), UsePipes(OneWeekPayloadPipe), ApiOperation({ summary: 'Search for patterns using last  week result' }), ApiBody({ type: PayloadOneWeekDto }))
}
