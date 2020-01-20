import {Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/User.dto';
import {UserLoginExist} from './exceptions/userLoginExist.exception';

@Controller('user')
export class UserController {

    // Inject User Service
    constructor(private userService: UserService) {}

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
