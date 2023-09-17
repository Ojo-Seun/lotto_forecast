import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { ThreeWeeksPayload } from '../interface/types'
import { Validators } from '../../global-utils/validator.service'

interface Data {
  pattern: string
  payload: ThreeWeeksPayload
}

@Injectable()
export class ThreeWeeksDataPayloadPipe implements PipeTransform<ThreeWeeksPayload, ThreeWeeksPayload> {
  constructor(private readonly validators: Validators) {}

  transform(value: ThreeWeeksPayload, metadata: ArgumentMetadata): ThreeWeeksPayload {
    // Check if request body has values

    if (!value) {
      throw new UnprocessableEntityException({ message: 'No payload' })
    }

    // Check if all request body has valid values
    const { err, message } = this.validators.threeWeekDataValidator(value)
    if (err) {
      throw new UnprocessableEntityException({ message })
    } else {
      return value
    }
  }
}
