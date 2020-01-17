import {Controller, Get} from '@nestjs/common';
import {UserService} from './user.service'
import {IUser} from "./interfaces/user.interface";

@Controller('user')
export class UserController {

    // injection service
    constructor(private userService: UserService) {
    }

    @Get('/get')
    getList(): Promise<IUser> {
        return this.userService.find('5e21ae7a1c9d440000fa229f')
    }
}
