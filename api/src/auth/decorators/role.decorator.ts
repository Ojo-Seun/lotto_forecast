import { SetMetadata } from '@nestjs/common'
import { Role } from 'src/users/interface/user.interface'

export const Roles = (role: Role) => SetMetadata('role', role)
