import * as mongoose from 'mongoose'
import { roleEnum } from "../emuns/role.emun";

export const UserSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    session: { type: String, required: true },
    role: { type: [Number], required: true, enum: Object.values(roleEnum) }
})

UserSchema.index({ login: 1 })