import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class CreateUserPipe implements PipeTransform<CreateUserDto, CreateUserDto> {
  constructor(private validatorService: Validators) {}
  transform(value: CreateUserDto, metadata: ArgumentMetadata): CreateUserDto {
    if (!value?.email) {
      throw new UnauthorizedException('no inputs')
    }
    const isValid = this.validatorService.registerInputsValidator(value)
    if (isValid?.err) {
      throw new UnauthorizedException({ success: false, cause: isValid.message })
    }
    return value
  }
}
