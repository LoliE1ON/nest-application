import {Controller, Get} from '@nestjs/common';
import { UserService } from "../user/user.service";

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {
    }

    @Get('list')
    getAllUsers() {
        return this.userService.getAll()
    }

}
