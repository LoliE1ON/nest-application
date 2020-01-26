import {ExecutionContext, Inject, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Token} from '../../token/types/token.type';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(@Inject('AuthService') private readonly authService: AuthService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if (authorization && authorization.length > 7) {
            const token: Token = authorization.slice(7);
            return !!await this.authService.verifyToken(token);
        }
        return false;
    }

}