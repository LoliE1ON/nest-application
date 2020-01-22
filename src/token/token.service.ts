import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IToken } from './interfaces/token.interface';
import { CreateTokenDto } from './dto/createToken.dto';

@Injectable()
export class TokenService {

    constructor(@InjectModel('Token') private readonly tokenModel: Model<IToken>) {
    }

    // Create new token
    async create(createTokenDto: CreateTokenDto): Promise<IToken> {
        try {
            const token = new this.tokenModel(createTokenDto);
            return await token.save();
        } catch (e) {
            Logger.error(e);
            throw new InternalServerErrorException();
        }
    }

    // Delete token
    async delete(userId: string, token: string): Promise<{ ok?: number, n?: number }> {
        try {
            return await this.tokenModel.deleteOne({ userId, token });
        } catch (e) {
            Logger.error(e);
            throw new InternalServerErrorException();
        }
    }

    // Check token
    async exists(userId: string, token: string): Promise<boolean> {
        try {
            return await this.tokenModel.exists({ userId, token });
        } catch (e) {
            Logger.error(e);
            throw new InternalServerErrorException();
        }
    }

}
