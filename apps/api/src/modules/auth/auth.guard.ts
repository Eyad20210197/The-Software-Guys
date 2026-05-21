import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Administrative access token required');
    }

    const token = authHeader.split(' ')[1];
    const admin = await this.authService.validateToken(token);

    if (!admin) {
      throw new UnauthorizedException('Invalid or expired administrative session');
    }

    // Attach admin to request
    request.user = admin;
    return true;
  }
}
