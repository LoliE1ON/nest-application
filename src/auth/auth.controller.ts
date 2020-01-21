import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Authentication user
    @Post('login')
    async login(@Request() req) {
        const user: IUser = await this.authService.validateUser(req.body.login, req.body.password);
        return this.authService.login(user);
    }
}
