import {IsString} from 'class-validator';

export class UserAuthDto {

    @IsString()
    readonly login: string;

    @IsString()
    readonly password: string;
}