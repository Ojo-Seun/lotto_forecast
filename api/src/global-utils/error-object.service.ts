import { Injectable, HttpStatus } from '@nestjs/common'

@Injectable()
export class ErrorObjectService {
  error(error: string, cause: string, status = HttpStatus.EXPECTATION_FAILED) {
    return {
      response: {
        succsess: false,
        error,
        statusCode: status,
        cause,
      },
      status,
      options: { cause: cause },
    }
  }
}
