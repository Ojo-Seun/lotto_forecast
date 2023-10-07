import { Controller, Get, Post, Body, Query, UsePipes, HttpException, HttpStatus } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { ThreeWeeksPattern, ThreeWeeksPayload } from './interface/types'
import { ThreeWeeksPaylaodDto } from './dto/payloadDto'
import { games, ghanas, premmiers, twoWeeksPatterns } from 'src/games/utils/util'
import { ThreeWeeksDataPayloadPipe } from './pipes/threeWeeksDataPipe'
import { ThreeWeeksService } from './three-weeks.service'
import { ErrorObjectService } from 'src/global-utils/error-object.service'

const schema = {
  type: 'object',
  properties: {
    ghanas: {
      enum: ghanas as string[],
    },
    premmiers: {
      enum: premmiers as string[],
    },
    games: {
      enum: games as string[],
    },

    patterns: {
      enum: twoWeeksPatterns as string[],
    },
  },
}

@Controller('games/three_weeks')
@ApiTags('Game Forecast With Last 3 Weeks Result')
export class ThreeWeeksController {
  constructor(private readonly threeWeeksService: ThreeWeeksService, private readonly errorService: ErrorObjectService) {}

  @Get()
  @ApiOperation({ summary: `Returns "games","ghanas","premmiers" and "twoWeeksPatterns" data, they are [String]` })
  @ApiResponse({
    status: 200,
    schema: { ...schema },
  })
  getData() {
    return this.threeWeeksService.getData()
  }

  @Post('search')
  @UsePipes(ThreeWeeksDataPayloadPipe)
  @ApiOperation({ summary: 'Search for patterns using last 3 weeks result' })
  @ApiBody({ type: ThreeWeeksPaylaodDto })
  async search(@Body('payload') payload: ThreeWeeksPaylaodDto) {
    try {
      const result = await this.threeWeeksService.search(payload)
      return result
    } catch (error: any) {
      const { response, status, options } = this.errorService.error('error occured', error.message, HttpStatus.EXPECTATION_FAILED)
      throw new HttpException(response, status, options)
    }
  }
}
