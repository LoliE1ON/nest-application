import { IsString, MaxLength } from "class-validator"
import { rolesEnum } from "../emuns/roles.emun"

export class UserDto {

    @IsString()
    login: String

    @IsString()
    password: String

    @IsString()
    session: String

    @MaxLength(20, {
        each: true
    })
    role: Array<rolesEnum>

}