import {Injectable, Logger} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { MD5 } from 'crypto-js';

import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/User.dto';
import { rolesEnum } from './emuns/roles.emun';

@Injectable()
export class UserService {

    // Inject User model
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    // Create new user
    async create(userDto: UserDto, role: rolesEnum = 0): Promise<IUser> {

        // Set a default role for user
        userDto.role = [role];

        const hash = MD5('Password', userDto.password);
        const user = new this.userModel(_.assignIn(userDto, { password: hash }));

        try {
            return await user.save();
        } catch (e) {
            Logger.error(e);
        }

    }

    // Find user by ID
    async findOne(login: string): Promise<IUser> {

        try {
            return await this.userModel.findOne({login}).exec();
        } catch (e) {
            Logger.error(e);
        }

    }

    // Get all users collection
    async getAll(): Promise<UserDto[]> {

        try {

            const users: UserDto[] = await this.userModel.find().select({ password: 0, session: 0 }).exec();
            return users;

        } catch (e) {
            Logger.error(e);
        }

    }

    // Check if login exists
    async existLogin(login: string): Promise<boolean> {

        try {
            const user: UserDto = await this.userModel.findOne({ login }).exec();
            return !!user;
        } catch (e) {
            Logger.error(e);
        }

    }
}
