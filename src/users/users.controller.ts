import {Controller, Get, HttpStatus} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { IUsersList } from './interfaces/users.list.interface'

@Controller('users')
export class UsersController {

    // Inject User Service from User Module
    constructor(private userService: UserService) {}

    // Get all users collection
    @Get('list')
    async getAllUsers(): Promise<IUsersList> {
        return {
            statusCode: HttpStatus.OK,
            users: await this.userService.getAll()
        }
    }

}
