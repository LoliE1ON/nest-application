import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service'
import {IUser} from "./interfaces/user.interface";
import {UserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getList(): Promise<IUser> {
        return this.userService.find('5e21ae7a1c9d440000fa229f')
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user)
    }
}
