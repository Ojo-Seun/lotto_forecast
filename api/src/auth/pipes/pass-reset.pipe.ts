import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common'
import { ResetPassDto } from '../dto/reset-pass.dto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class PasswordResetPipe implements PipeTransform<ResetPassDto, ResetPassDto> {
  constructor(private readonly validatorService: Validators) {}
  transform(value: ResetPassDto, metadata: ArgumentMetadata): ResetPassDto {
    if (!value) {
      throw new UnauthorizedException('no inputs')
    }
    const isValid = this.validatorService.resetPassValidator(value)
    if (isValid?.err) {
      throw new UnauthorizedException({ success: false, message: isValid.message })
    }
    return value
  }
}
