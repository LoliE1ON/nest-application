import { rolesEnum } from "../emuns/roles.emun"

export class UserPublicDto {

    readonly _id: String
    readonly login: String
    readonly role: Array<rolesEnum>

}