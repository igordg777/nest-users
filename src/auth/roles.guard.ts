import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from "./roles-auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
        private reflector: Reflector

    ) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])


            if (!requiredRoles) {
                return true
            }
            console.log({ requiredRoles })

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            // console.log({ authHeader });

            const bearer = authHeader.split(" ")[0];
            // console.log({ bearer });

            const token = authHeader.split(" ")[1];
            console.log({ token });


            if (!authHeader || bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            console.log({ user_roles: user.roles });

            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (error) {
            console.log({ error });

            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }

}