import { ThrottlerOptions } from '@nestjs/throttler'

const throttlerOptions: ThrottlerOptions = {
  ttl: 60,
  limit: 10,
}

export default throttlerOptions
