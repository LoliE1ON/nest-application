import { Document } from "mongoose";
import {rolesEnum} from "../emuns/roles.emun";

export interface IUser extends Document {
    readonly login: String
    readonly password: String
    readonly session: String
    readonly role: Array<rolesEnum>
}