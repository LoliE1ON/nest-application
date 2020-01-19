import {Controller, Get} from '@nestjs/common';
import {UserService} from "../user/user.service";

@Controller('users')
export class UsersController {

    // Inject User Service from User Module
    constructor(private userService: UserService) {}

    // Get all users collection
    @Get('list')
    async getAllUsers(): Promise<object> {
        return {
            users: await this.userService.getAll()
        }
    }

}
