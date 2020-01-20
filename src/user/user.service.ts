import {Injectable, Logger} from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as _ from 'lodash'
import { MD5 } from 'crypto-js'

import { IUser } from './interfaces/user.interface'
import { UserDto } from './dto/User.dto'
import { rolesEnum } from './emuns/roles.emun'
import { UserPublicDto } from './dto/UserPublic.dto'

@Injectable()
export class UserService {

    // Inject User model
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    // Create new user
    async createUser(userDto: UserDto, role: rolesEnum = 0): Promise<IUser> {

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
    async find(id: string): Promise<UserDto> {

        try {
            return await this.userModel.findById(id).exec();
        } catch (e) {
            Logger.error(e);
        }

    }

    // Get all users collection
    async getAll(): Promise<UserPublicDto[]> {

        try {

            const users: UserPublicDto[] = await this.userModel.find().select({ password: 0, session: 0 }).exec();
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
