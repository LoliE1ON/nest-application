import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as moment from 'moment';

import {UserService} from '../user/user.service';
import {IUser} from '../user/interfaces/user.interface';
import {UserDto} from '../user/dto/user.dto';

import {Token} from '../token/types/token.type';
import {TokenService} from '../token/token.service';
import {CreateTokenDto} from '../token/dto/createToken.dto';
import {IToken} from '../token/interfaces/token.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    // Sign up user
    async signUp(user: UserDto): Promise<CreateTokenDto> {

        // Create new user
        const createUser: IUser = await this.userService.create(user);

        // Generate new token
        const generateToken: Token = await this.generateToken({ userId: createUser._id });

        // Token end of life
        const expiresIn = moment().add(2, 'd').toString();

        // Prepare token data for save to db
        const newToken: CreateTokenDto = {
            userId: createUser._id,
            token: generateToken,
            expiresIn,
        };

        // Save token to db
        await this.saveToken(newToken);
        return newToken;
    }

    async signIn(login: string, password: string): Promise<string> {
        return 'df';
    }

    // Generate new token
    private async generateToken(data): Promise<Token> {
        return this.jwtService.sign(data);
    }

    // Verification token
    async verifyToken(token: Token): Promise<any> {
        try {
            const data = this.jwtService.verify(token);
            const tokenExists = this.tokenService.exists(data.userId, token);
            if (tokenExists) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (e) {
            Logger.error(e);
            throw new UnauthorizedException();
        }
    }

    // Save token to db
    private async saveToken(createTokenDto: CreateTokenDto): Promise<IToken> {
        return await this.tokenService.create(createTokenDto);
    }
}
