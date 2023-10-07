import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { Validators } from '../../global-utils/validator.service'
import { GetEvents } from '../interface/game-events.interface'

@Injectable()
export class GetEventsDataPipe implements PipeTransform<GetEvents, GetEvents> {
  constructor(private readonly validators: Validators) {}

  transform(value: GetEvents, metadata: ArgumentMetadata): GetEvents {
    // Check if request body has values
    if (!value?.game) {
      throw new UnprocessableEntityException({ message: 'No payload' })
    }

    // Check if all request body has valid values
    const isValid = this.validators.getEventsValidator(value)
    if (isValid?.err) {
      throw new UnprocessableEntityException({ message: isValid.message })
    }
    return value
  }
}
