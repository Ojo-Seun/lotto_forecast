import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { InserOne } from '../interface/insert_one.interface'
import { Validators } from '../../global-utils/validator.service'
import { games } from 'src/games/utils/util'

@Injectable()
export class InserOnePipe implements PipeTransform<InserOne, InserOne> {
  constructor(private readonly validators: Validators) {}

  transform(value: InserOne, metadata: ArgumentMetadata): InserOne {
    if (!value || value.game !== value.payload.Name) {
      throw new UnprocessableEntityException(`${value?.game} is not a vaild game name or is empty`)
    }
    const isValidName = this.validators.gameNameValidator(value.game, games as string[])
    const isValidPayload = this.validators.dataEventValidator(value.payload)
    const allIsValid = isValidName ?? isValidPayload
    if (allIsValid?.err) {
      throw new UnprocessableEntityException(allIsValid.message)
    }

    return value
  }
}
