import { Role } from 'src/users/interface/user.interface'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/role.guard'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

export function Auth(role: Role) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AuthGuard, RolesGuard), ApiBearerAuth(), ApiUnauthorizedResponse({ description: 'Unauthorized' }))
}
