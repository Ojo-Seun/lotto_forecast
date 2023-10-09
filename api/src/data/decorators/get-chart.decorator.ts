import { applyDecorators, UsePipes } from '@nestjs/common'
import { GetChartPipe } from '../pipes/get-chart.pipe'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { GetChartDTO } from '../dto/get-chartDto'
import { GameDto } from '../dto/gameDto'

export function GetChart() {
  return applyDecorators(UsePipes(GetChartPipe), ApiBody({ type: GetChartDTO, required: true }), ApiOperation({ summary: 'get a Chart for a specific game and year' }), ApiOkResponse({ type: [GameDto] }))
}
