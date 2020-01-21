import * as mongoose from 'mongoose';
import { rolesEnum } from '../emuns/roles.emun';

export const UserSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [Number], required: true, enum: Object.values(rolesEnum) },
})

UserSchema.index({ login: 1 }, { unique: true });
