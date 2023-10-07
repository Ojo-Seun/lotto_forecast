import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { InsertMany } from '../interface/insert_many.interfer'
import { Validators } from '../../global-utils/validator.service'
import { games } from 'src/games/utils/util'

@Injectable()
export class InsertManyPipe implements PipeTransform<InsertMany, InsertMany> {
  constructor(private readonly validators: Validators) {}

  transform(value: InsertMany, metadata: ArgumentMetadata): InsertMany {
    if (!value || value.game !== value.payload?.[0].Name) {
      throw new UnprocessableEntityException(`${value?.game} is not a vaild game name or is empty`)
    }
    const isValidName = this.validators.gameNameValidator(value.game, games as string[])
    if (isValidName?.err) {
      throw new UnprocessableEntityException(isValidName.message)
    }

    if (value?.payload?.length < 1) {
      throw new UnprocessableEntityException('Payload is empty')
    }

    for (let i = 0; i < value.payload.length; i++) {
      const event = value.payload[i]
      const isValidPayload = this.validators.dataEventValidator(event)
      if (isValidPayload?.err) {
        throw new UnprocessableEntityException(isValidPayload.message)
      }
    }

    return value
  }
}
