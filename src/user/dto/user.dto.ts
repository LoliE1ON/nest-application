import { IsString, MaxLength } from "class-validator"
import { roleEnum } from "../emuns/role.emun"

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
    role: Array<roleEnum>

}