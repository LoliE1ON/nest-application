/* tslint:disable */
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { AuthenticationError } from './exceptions/authenticationError.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    // Check user login and password
    async validateUser(login: string, password: string): Promise<IUser> {
        try {
            const user: IUser = await this.userService.findOne(login);
            if (user && user.password === password) { return user; }

            // If incorrect data
            throw new AuthenticationError();
        } catch (e) {
            Logger.error(e);
        }
    }

    // Create access token
    async login(user: IUser) {
        const payload = {
            userId: user._id,
            login: user.login,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
