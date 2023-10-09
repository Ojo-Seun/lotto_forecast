import { Injectable, PipeTransform, ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common'
import { GetYearsDTO } from '../dto/get-yearsDto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class GetYearsPipe implements PipeTransform<GetYearsDTO, GetYearsDTO> {
  constructor(private readonly validatorService: Validators) {}
  transform(value: GetYearsDTO, metadata: ArgumentMetadata): GetYearsDTO {
    if (!value?.game) {
      throw new UnprocessableEntityException('game name is required')
    }
    const isValid = this.validatorService.getYearsValidator(value)
    if (isValid?.err) {
      throw new UnprocessableEntityException(isValid.message)
    }
    return value
  }
}
