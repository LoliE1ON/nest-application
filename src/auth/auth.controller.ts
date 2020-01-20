import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { AuthenticationError } from './exceptions/authenticationError.exception';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Request() req) {

        const user: UserDto | null = await this.authService.validateUser(req.body.login, req.body.password);
        if (user != null) {
            return this.authService.login(user);
        } else {
            throw new AuthenticationError();
        }
    }
}
