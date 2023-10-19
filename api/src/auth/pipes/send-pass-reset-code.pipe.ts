import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common'
import { SendPassResetCodeDto } from '../dto/send-pass-reset-code.dto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class SendPassResetCodePipe implements PipeTransform<SendPassResetCodeDto, SendPassResetCodeDto> {
  constructor(private readonly validatorService: Validators) {}
  transform(value: SendPassResetCodeDto, metadata: ArgumentMetadata): SendPassResetCodeDto {
    if (!value) {
      throw new UnauthorizedException('no inputs')
    }
    const isValid = this.validatorService.sendPassResetCodeValidator(value)
    if (isValid?.err) {
      throw new UnauthorizedException({ success: false, message: isValid.message })
    }
    return value
  }
}
