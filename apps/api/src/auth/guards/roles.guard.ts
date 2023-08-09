import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log("🚀 ~ file: roles.guard.ts:15 ~ RolesGuard ~ canActivate ~ requiredRoles:", requiredRoles)
    if (!requiredRoles) {
      return true;
    }
    const { body: { isAdmin }} = context.switchToHttp().getRequest();
    console.log("🚀 ~ file: roles.guard.ts:19 ~ RolesGuard ~ canActivate ~ isAdmin:", isAdmin)
    return isAdmin;
  }
}