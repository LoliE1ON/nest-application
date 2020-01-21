import { Document } from 'mongoose';
import { rolesEnum } from '../emuns/roles.emun';

export interface IUser extends Document {
    readonly login: string;
    readonly password: string;
    readonly role: rolesEnum[];
}
