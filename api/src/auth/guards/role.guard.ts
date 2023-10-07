import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '../decorators/role.decorator'
import { Role, UserPayload } from 'src/users/interface/user.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const user: UserPayload = await req.user
    if (!user) return false
    const userRoles = user.roles
    const handler = context.getHandler()
    const handlerRole = this.reflector.get<Role>(Roles, handler)
    return this.matchRoles(userRoles, handlerRole)
  }

  matchRoles(userRoles: string[], handlerRole: string): boolean {
    const role = handlerRole
    return userRoles.includes(role)
  }
}
