import { Injectable, PipeTransform, ArgumentMetadata, UnauthorizedException } from '@nestjs/common'
import { SendEmailDto } from '../dto/email.dto'
import { Validators } from 'src/global-utils/validator.service'

@Injectable()
export class SendEmailPipe implements PipeTransform<SendEmailDto, SendEmailDto> {
  constructor(private validatorService: Validators) {}

  transform(value: SendEmailDto, metadata: ArgumentMetadata): SendEmailDto {
    if (!value?.email) {
      throw new UnauthorizedException('inputs required')
    }
    const isValid = this.validatorService.sendMailInputsValidator(value)
    if (isValid?.err) {
      throw new UnauthorizedException({ success: false, cause: isValid.message })
    }
    return value
  }
}
