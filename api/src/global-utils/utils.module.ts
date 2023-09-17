import { Module, Global } from '@nestjs/common'
import { Validators } from './validator.service'
import { PayloadService } from './payload.service'
import { ErrorObjectService } from './error-object.service'

@Global()
@Module({
  providers: [Validators, PayloadService, ErrorObjectService],
  exports: [Validators, PayloadService, ErrorObjectService],
})
export class UtilsModule {}
