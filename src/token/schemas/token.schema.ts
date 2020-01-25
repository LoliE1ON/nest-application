import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    token: { type: String, required: true },
    exp: { type: Number, required: true },
})

TokenSchema.index({ token: 1, userId: 1}, { unique: true });
