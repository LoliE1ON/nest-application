import { roleEnum } from "../emuns/role.emun"

export class UserPublicDto {

    readonly _id: String
    readonly login: String
    readonly role: Array<roleEnum>

}