import {Controller, Get, HttpStatus, UseGuards} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtAuthGuard} from '../auth/guards/jwtAuth.guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {}

    // Get all users collection
    @UseGuards(JwtAuthGuard)
    @Get('list')
    async list() {
        return {
            users: await this.userService.getAll(),
        };
    }

}
