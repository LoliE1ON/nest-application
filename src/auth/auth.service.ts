import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
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

    // Verification token for Guard
    public async verifyToken(token: Token): Promise<boolean> {
        try {
            const data: IToken = this.jwtService.verify(token);
            const currentTime: number = Math.round(new Date().getTime() / 1000);
            if (data.exp < currentTime) { return false; }
            return !!await this.tokenService.exists(data.userId, token);
        } catch (e) { return false; }
    }

    // Generate new token
    private async generateToken(data): Promise<Token> {
        return this.jwtService.sign(data);
    }

    // Save token to db
    private async saveToken(createTokenDto: CreateTokenDto): Promise<IToken> {
        return await this.tokenService.create(createTokenDto);
    }

    // Generate new token, save to db
    private async createToken(user: IUser): Promise<IToken> {
        const generateToken: Token = await this.generateToken({ userId: user._id });
        const token: CreateTokenDto = {
            token: generateToken,
            ...this.jwtService.verify(generateToken),
        };
        return await this.saveToken(token);
    }
}
