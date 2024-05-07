import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';

const fakeUser = {
  username: 'John',
  roles: ['admin', 'manager', 'artist', 'partner'],
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Inside RolesGuard");

    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    console.log("Required roles: ");
    console.log(requiredRoles);

    if (requiredRoles?.every(requiredRole => fakeUser.roles.includes(requiredRole))) {
      console.log("User has every required role!");
      return true;
    }

    console.log("Unauthorized ressource!");
    return false;
  }
}
