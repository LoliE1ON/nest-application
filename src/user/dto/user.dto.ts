import { IsString, MaxLength } from 'class-validator';
import { rolesEnum } from '../emuns/roles.emun';

export class UserDto {

    @IsString()
    login: string;

    @IsString()
    password: string;

    @MaxLength(20, {
        each: true,
    })
    role: rolesEnum[];

}
