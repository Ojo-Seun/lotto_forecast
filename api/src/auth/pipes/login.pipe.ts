import { Injectable, PipeTransform, ArgumentMetadata, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from '../dto/login.dto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class LoginPipe implements PipeTransform<LoginDto, LoginDto> {
  constructor(private validatorService: Validators) {}

  transform(value: LoginDto, metadata: ArgumentMetadata): LoginDto {
    if (!value?.email) {
      throw new UnauthorizedException('no inputs')
    }
    const isValid = this.validatorService.loginInputsValidator(value)
    if (isValid?.err) {
      throw new UnauthorizedException({ success: false, message: isValid.message })
    }
    return value
  }
}
