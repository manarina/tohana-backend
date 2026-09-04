import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLE_HIERARCHY } from '../../../common/constants/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      return false;
    }

    // Si l'utilisateur est ADMIN, il a accès à tout
    if (user.role === 'ADMIN') {
      return true;
    }

    // Vérifier si l'utilisateur a au moins le rôle requis
    const userRoleLevel = ROLE_HIERARCHY[user.role] || 0;
    const requiredRoleLevel = Math.max(
      ...requiredRoles.map((role) => ROLE_HIERARCHY[role] || 0),
    );

    return userRoleLevel >= requiredRoleLevel;
  }
}