import { Document } from 'mongoose';

export interface IToken extends Document {
    readonly userId: string;
    readonly token: string;
    readonly exp: number;
}
