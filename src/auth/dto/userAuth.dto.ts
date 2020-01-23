import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UserAuthDto {

    @ApiProperty({
        description: 'User login',
    })
    @IsString()
    readonly login: string;

    @ApiProperty({
        description: 'User password',
    })
    @IsString()
    readonly password: string;
}