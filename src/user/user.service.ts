import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import * as _ from 'lodash';

import {IUser} from './interfaces/user.interface';
import {UserDto} from './dto/User.dto';
import {rolesEnum} from './emuns/roles.emun';

@Injectable()
export class UserService {

    // Inject User model
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    // Create new user
    async create(userDto: UserDto, role: rolesEnum = 0): Promise<IUser> {
        const hash = require('crypto').createHash('md5').update(userDto.password).digest('hex');
        const user = new this.userModel(_.assignIn(userDto, { password: hash, role: [role]}));
        return await user.save();
    }

    // Find user by ID
    async findOne(login: string): Promise<IUser> {
        return await this.userModel.findOne({login}).exec();
    }

    // Get all users collection
    async getAll(): Promise<UserDto[]> {
        return await this.userModel.find().select({ password: 0, session: 0 }).exec();
    }

    // Check if login exists
    async existLogin(login: string): Promise<boolean> {
        const user: UserDto = await this.userModel.findOne({ login }).exec();
        return !!user;
    }
}
