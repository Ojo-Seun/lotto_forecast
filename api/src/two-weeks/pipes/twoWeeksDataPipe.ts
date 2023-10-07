import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { TwoWeeksPayload } from '../interface/types'
import { Validators } from '../../global-utils/validator.service'

@Injectable()
export class TwoWeeksDataPayloadPipe implements PipeTransform<TwoWeeksPayload, TwoWeeksPayload> {
  constructor(private readonly validators: Validators) {}

  transform(value: TwoWeeksPayload, metadata: ArgumentMetadata): TwoWeeksPayload {
    // Check if request body has values
    if (!value?.game) {
      throw new UnprocessableEntityException({ message: 'No payload' })
    }

    // Check if all request body has valid values
    const { err, message } = this.validators.twoWeekDataValidator(value)
    if (err) {
      throw new UnprocessableEntityException({ message })
    }
    return value
  }
}
