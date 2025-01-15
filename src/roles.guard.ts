
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './common/decorators/roles.decorator';

// function matchRoles(roles: string[], userRoles: string[]): boolean {
//   return roles.some(role => userRoles.includes(role));
// }

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  // TypeScript
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      // Handle the case where user or user.roles is undefined
      return true;
    }

    // Your existing logic to check roles
    return true;
  }
}
