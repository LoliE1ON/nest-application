import * as mongoose from 'mongoose';
import {IsNumber, IsString} from 'class-validator';

export class CreateTokenDto {

    @IsString()
    readonly userId: mongoose.Types.ObjectId;

    @IsString()
    readonly token: string;

    @IsNumber()
    readonly exp: number;
}
