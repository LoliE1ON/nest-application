import * as mongoose from 'mongoose';
import { IsDateString, IsString } from 'class-validator';

export class CreateTokenDto {

    @IsString()
    readonly userId: mongoose.Types.ObjectId;

    @IsString()
    readonly token: string;

    @IsDateString()
    readonly expiresIn: string;
}
