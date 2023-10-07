import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common'
import { Games } from 'src/games/interface/types'
import { Validators } from '../../global-utils/validator.service'
import { games } from 'src/games/utils/util'

interface Payload {
  game: Games
}

@Injectable()
export class GameDetailsPipe implements PipeTransform<Payload, Payload> {
  constructor(private readonly validators: Validators) {}
  transform(value: Payload, metadata: ArgumentMetadata): Payload {
    if (!value) {
      throw new HttpException('game name must be provided', HttpStatus.NOT_ACCEPTABLE)
    }
    const isValidName = this.validators.gameNameValidator(value.game, games as string[])
    if (isValidName?.err) {
      throw new HttpException(isValidName.message, HttpStatus.NOT_ACCEPTABLE)
    }

    return value
  }
}
