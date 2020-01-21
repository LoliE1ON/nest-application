import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    token: { type: mongoose.Types.ObjectId, required: true },
    expiresIn: { type: Date, required: true },
})

TokenSchema.index({ token: 1, userId: 1}, { unique: true });
