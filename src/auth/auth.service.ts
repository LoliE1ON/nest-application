/* tslint:disable */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { TokenService } from '../token/token.service';
import { CreateTokenDto } from '../token/dto/createToken.dto';
import { IToken } from '../token/interfaces/token.interface';
import { UserDto } from '../user/dto/user.dto';

import { AuthenticationError } from './exceptions/authenticationError.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    async signUp(user: UserDto): Promise<string> {

        const createUser: IUser = await this.userService.create(user);
        const generateToken: string = await this.generateToken({ userId: createUser._id });
        const createToken: CreateTokenDto = {
            userId: createUser._id,
            token: generateToken,
            expiresIn: new Date(new Date().getTime()+(5*24*60*60*1000)).toString(),
        };

        const saveToken: IToken = await this.tokenService.create(createToken);
        return saveToken.token;

    }

    async signIn(login: string, password: string): Promise<string> {
        return 'df';
    }

    private async generateToken(data): Promise<string> {
        return this.jwtService.sign(data);
    }

    private async verifyToken(token): Promise<any> {
        try {
            const data = this.jwtService.verify(token);
            const tokenExsist = this.tokenService.exists(data.userId, token);

            if (tokenExsist) {
                return data;
            }

            throw new UnauthorizedException();
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    private async saveToken(createTokenDto: CreateTokenDto): Promise<IToken> {
        const userToken = this.tokenService.create(createTokenDto);
        return userToken;
    }
}
