import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(login: string, pass: string): Promise<UserDto | null> {
        const user: UserDto = await this.userService.findOne(login);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { login: user.login, id: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
