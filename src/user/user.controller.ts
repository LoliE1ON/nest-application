import {Body, Controller, Get, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/User.dto';
import {UserLoginExist} from './exceptions/userLoginExist.exception';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    // Get user
    @UseGuards(AuthGuard('jwt'))
    @Get(':login')
    async getUser(@Param() params) {
        return this.userService.findOne(params.login);
    }

}
