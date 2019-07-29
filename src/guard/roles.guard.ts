import { Injectable, CanActivate, ExecutionContext, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

function validateRequest(request: Request, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return true;
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        return validateRequest(request, context);
    }
}
