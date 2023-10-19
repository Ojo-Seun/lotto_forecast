import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const token = this.extractTokenFromHeader(req)
      const payload = await this.verifyToken(token)
      req['user'] = payload
      return true
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  private extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    const isToken = type === 'Bearer' && token ? token : null
    if (isToken) {
      return token
    }
    throw new UnauthorizedException({ success: false, message: 'token is required' })
  }

  private async verifyToken(token: string) {
    const secret = this.configService.get('JWT_SECRET')

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret })
      return payload
    } catch (err) {
      throw new UnauthorizedException({ success: false, message: 'Invalid or expired token', statusCode: 401, cause: err.message })
    }
  }
}
