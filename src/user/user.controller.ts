import {Body, Controller, Get, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/User.dto';
import {UserLoginExist} from './exceptions/userLoginExist.exception';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
export class UserController {

    // Inject User Service
    constructor(private userService: UserService) {}

    // Get user
    @UseGuards(AuthGuard('jwt'))
    @Get(':login')
    async getUser(@Param() params) {
        return this.userService.findOne(params.login);
    }

    // Create new user
    @UsePipes(new ValidationPipe())
    @Post()
    async createUser(@Body() user: UserDto) {

        // Check login exist
        const checkLoginExist: boolean = await this.userService.existLogin(user.login);
        if (checkLoginExist) {
            throw new UserLoginExist();
        }

        // Create new user
        await this.userService.createUser(user);
        return {
            statusCode: HttpStatus.OK,
            message: 'You have successfully registered',
        };
    }

}
