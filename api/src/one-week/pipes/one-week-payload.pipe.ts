import { Injectable, ArgumentMetadata, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { OneWeekPayload } from '../interface/types'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class OneWeekPayloadPipe implements PipeTransform<OneWeekPayload, OneWeekPayload> {
  constructor(private readonly validatorService: Validators) {}
  transform(value: OneWeekPayload, metadata: ArgumentMetadata): OneWeekPayload {
    // Check if request body has values

    if (!value) {
      throw new UnprocessableEntityException({ message: 'No payload' })
    }

    // Check if all request body has valid values
    const isValid = this.validatorService.oneWeekDataValidator(value)
    if (isValid?.err) {
      throw new UnprocessableEntityException({ message: isValid.message })
    } else {
      return value
    }
  }
}
