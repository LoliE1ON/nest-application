import { IsString, MaxLength, MinLength } from 'class-validator';
import { rolesEnum } from '../emuns/roles.emun';
import {ApiProperty} from '@nestjs/swagger';

export class UserDto {

    @ApiProperty({
        description: 'User login',
    })
    @MinLength(4)
    @MaxLength(25)
    @IsString()
    login: string;

    @ApiProperty({
        description: 'User password',
    })
    @MinLength(8)
    @IsString()
    password: string;

    @MaxLength(20, {
        each: true,
    })
    role: rolesEnum[];

}
