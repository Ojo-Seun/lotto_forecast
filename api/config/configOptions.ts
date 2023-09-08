import { ConfigModuleOptions } from '@nestjs/config'
import configuration from './configuration'

const configOptions: ConfigModuleOptions = {
  load: [configuration],
  isGlobal: true,
}

export default configOptions
