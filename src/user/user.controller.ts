import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service'
import {UserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {

    // Inject User Service
    constructor(private userService: UserService) {}

    // Create new user
    @UsePipes(new ValidationPipe())
    @Post()
    async createUser(@Body() user: UserDto) {

        // Check login exist
        const checkLoginExist: Boolean = await this.userService.existLogin(user.login)
        if(checkLoginExist) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This login already exists.',
            }, 403);
        }

        // Create new user
        await this.userService.createUser(user)
        return {
            message: 'You have successfully registered'
        }
    }

}
