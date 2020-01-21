import {Body, Controller, Get, HttpStatus, Param, Post, Request, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserDto} from '../user/dto/user.dto';
import {UserLoginExist} from '../user/exceptions/userLoginExist.exception';
import {UserService} from '../user/user.service';
import {CreateTokenDto} from '../token/dto/createToken.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    // Create new user
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() user: UserDto) {

        // Check login exist
        const checkLoginExist: boolean = await this.userService.existLogin(user.login);
        if (checkLoginExist) {
            throw new UserLoginExist();
        }

        // Create new user
        const token: CreateTokenDto = await this.authService.signUp(user);
        return {
            statusCode: HttpStatus.OK,
            message: 'You have successfully registered',
            user: token,
        };
    }
}
