import {Body, Controller, Get, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/User.dto';
import {UserLoginExist} from './exceptions/userLoginExist.exception';
import {AuthGuard} from '@nestjs/passport';
import {MD5} from 'crypto-js';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}
}
