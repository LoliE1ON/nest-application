import { rolesEnum } from '../emuns/roles.emun';

export class UserPublicDto {
    readonly _id: string;
    readonly login: string;
    readonly role: rolesEnum[];
}
