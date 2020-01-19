import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service'
import {IUser} from "./interfaces/user.interface";
import {UserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {

    // Inject User Service
    constructor(private userService: UserService) {}

    // Create new user
    @UsePipes(new ValidationPipe())
    @Post()
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user)
    }

}
