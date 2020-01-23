import {Body, Controller, Get, HttpStatus, Param, Post, Request, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserDto} from '../user/dto/user.dto';
import {UserLoginExist} from '../user/exceptions/userLoginExist.exception';
import {UserService} from '../user/user.service';
import {UserAuthDto} from './dto/userAuth.dto';
import {AuthenticationError} from './exceptions/authenticationError.exception';
import {IToken} from '../token/interfaces/token.interface';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiDefaultResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiResponse
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    // Auth
    @ApiOkResponse({ description: 'You have successfully logged in.' })
    @ApiForbiddenResponse({ description: 'The login or password is incorrect.'})
    @ApiBody({ type: [UserAuthDto]})
    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() userAuth: UserAuthDto) {

        // Validation auth data
        const token: IToken = await this.authService.login(userAuth);
        if (token) {
            return {
                statusCode: HttpStatus.OK,
                message: `Hello there, ${userAuth.login}!`,
                user: token,
            };
        } else {
            throw new AuthenticationError();
        }

    }

    // Create new user
    @ApiCreatedResponse({ description: 'User successfully registered.' })
    @ApiForbiddenResponse({ description: 'Login already exists.'})
    @ApiBadRequestResponse({ description: 'Validation failed.'})
    @ApiBody({ type: [UserDto]})
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() user: UserDto) {

        // Check login exists
        const checkLoginExists: boolean = await this.userService.existLogin(user.login);
        if (checkLoginExists) {
            throw new UserLoginExist();
        }

        // Create new user
        const token: IToken = await this.authService.register(user);
        return {
            statusCode: HttpStatus.OK,
            message: 'You have successfully registered',
            user: token,
        };
    }
}
