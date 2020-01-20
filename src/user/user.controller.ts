import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
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

        Logger.error('Error')

        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'test',
        }, 403);


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
            status: HttpStatus.OK,
            message: 'You have successfully registered'
        }
    }

}
