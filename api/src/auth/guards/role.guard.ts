import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role, UserPayload } from 'src/users/interface/user.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const user: UserPayload = await req.user
    if (!user) return false
    const userRoles = user.roles
    // Get the required role attached to handler
    const handler = context.getHandler()
    const controller = context.getClass()
    const handlerRole = this.reflector.getAllAndOverride<Role>('role', [handler, controller])
    const isMatch = this.matchRoles(userRoles, handlerRole)
    return isMatch
  }

  matchRoles(userRoles: string[], handlerRole: string): boolean {
    return userRoles.includes(handlerRole)
  }
}
