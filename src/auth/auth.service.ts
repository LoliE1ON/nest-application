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
import {UserAuthDto} from './dto/userAuth.dto';
import {AuthenticationError} from './exceptions/authenticationError.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    // Register new user
    async register(user: UserDto): Promise<IToken> {
        const createUser: IUser = await this.userService.create(user);
        return await this.createToken(createUser);
    }

    // Login
    async login(userAuth: UserAuthDto): Promise<IToken> {

        const candidate: IUser = await this.userService.findOne(userAuth.login);
        const passwordHash = require('crypto').createHash('md5').update(userAuth.password).digest('hex');
        if (candidate.password && candidate.password === passwordHash) {
            return await this.createToken(candidate);
        }
        throw new AuthenticationError();
    }

    // Generate new token, save to db
    private async createToken(user: IUser): Promise<IToken> {
        // Generate new token
        const generateToken: Token = await this.generateToken({ userId: user._id });

        // Token end of life
        const expiresIn = moment().add(2, 'd').toString();

        // Prepare token data for save to db
        const newToken: CreateTokenDto = {
            userId: user._id,
            token: generateToken,
            expiresIn,
        };

        // Save token to db
        return await this.saveToken(newToken);
    }

    // Generate new token
    private async generateToken(data): Promise<Token> {
        return this.jwtService.sign(data);
    }

    // Verification token
    async verifyToken(token: Token): Promise<object> {
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
