import { Injectable, PipeTransform, ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common'
import { GetChartDTO } from '../dto/get-chartDto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class GetChartPipe implements PipeTransform<GetChartDTO, GetChartDTO> {
  constructor(private readonly validatorService: Validators) {}
  transform(value: GetChartDTO, metadata: ArgumentMetadata): GetChartDTO {
    if (!value?.game || !value?.year) {
      throw new UnprocessableEntityException('name and year is required')
    }
    const isValid = this.validatorService.getChartValidator(value)
    if (isValid?.err) {
      throw new UnprocessableEntityException(isValid.message)
    }
    return value
  }
}
