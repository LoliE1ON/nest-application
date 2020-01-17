import {roleEnum} from "../emuns/role.emun";

export class CreateUserDto {
    readonly login: String
    readonly password: String
    readonly session: String
    readonly role: Array<roleEnum>
}