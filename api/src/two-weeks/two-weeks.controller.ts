import { Body, Controller, Post, Query, Get, UsePipes, HttpException, HttpStatus } from '@nestjs/common'
import type { TwoWeeksPayload } from './interface/types'
import { TwoWeeksPaylaodDto } from './dto/payloadDto'
import { TwoWeeksService } from './two-weeks.service'
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'
import { TwoWeeksDataPayloadPipe } from './pipes/twoWeeksDataPipe'
import { ErrorObjectService } from 'src/global-utils/error-object.service'

@Controller('games/two_weeks_data')
@ApiTags('Game Forecast With Last 2 Weeks Results')
export class TwoWeeksController {
  constructor(private readonly twoWeeksService: TwoWeeksService, private readonly errorService: ErrorObjectService) {}

  @Get()
  getData() {
    return this.twoWeeksService.getData()
  }

  @Post('manual-search')
  @UsePipes(TwoWeeksDataPayloadPipe)
  @ApiBody({ type: TwoWeeksPaylaodDto })
  async manualSearch(@Body('payload') payload: TwoWeeksPaylaodDto) {
    const queries = { ...payload } as unknown as TwoWeeksPayload
    try {
      const result = await this.twoWeeksService.manualSearch(queries)
      return {
        result,
      }
    } catch (error: any) {
      const { response, status, options } = this.errorService.error('error occured', error.message, HttpStatus.EXPECTATION_FAILED)
      throw new HttpException(response, status, options)
    }
  }

  @Post('auto-search')
  @UsePipes(TwoWeeksDataPayloadPipe)
  @ApiBody({ type: TwoWeeksPaylaodDto })
  async autoSearch(@Body('payload') payload: TwoWeeksPaylaodDto) {
    const queries = { ...payload } as unknown as TwoWeeksPayload
    try {
      const result = await this.twoWeeksService.autoSearch(queries)
      return {
        result,
      }
    } catch (error: any) {
      const { response, status, options } = this.errorService.error('error occured', error.message, HttpStatus.EXPECTATION_FAILED)
      throw new HttpException(response, status, options)
    }
  }
}
