import { HttpException, HttpStatus } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    const CLIENT_DEV_URL = 'http://localhost:5173'
    const CLIENT_PRO_URL = ''
    const URL = process.env.NODE_ENV === 'development' ? CLIENT_DEV_URL : CLIENT_PRO_URL
    if (origin !== URL) {
      console.log(origin)
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
    }

    cb(null, true)
  },

  optionsSuccessStatus: 200,
}

export default corsOptions
