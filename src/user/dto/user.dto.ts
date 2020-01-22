import { IsString, MaxLength, MinLength } from 'class-validator';
import { rolesEnum } from '../emuns/roles.emun';

export class UserDto {

    @MinLength(4)
    @MaxLength(25)
    @IsString()
    login: string;

    @MinLength(8)
    @IsString()
    password: string;

    @MaxLength(20, {
        each: true,
    })
    role: rolesEnum[];

}
