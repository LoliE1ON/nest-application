import { Document } from "mongoose";
import {roleEnum} from "../emuns/role.emun";

export interface IUser extends Document {
    readonly login: String
    readonly password: String
    readonly session: String
    readonly role: Array<roleEnum>
}