import { applyDecorators, UsePipes } from '@nestjs/common'
import { GetYearsPipe } from '../pipes/get-years.pipe'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { GetYearsDTO } from '../dto/get-yearsDto'

export function GetYears() {
  return applyDecorators(UsePipes(GetYearsPipe), ApiBody({ type: GetYearsDTO, required: true }), ApiOperation({ summary: 'get array of years for a specific game' }), ApiOkResponse({ type: [Number] }))
}
