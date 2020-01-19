import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import * as _ from 'lodash'
import { MD5 } from 'crypto-js'

import { IUser } from "./interfaces/user.interface";
import { UserDto } from './dto/user.dto'
import { roleEnum } from "./emuns/role.emun";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    // Create new user
    async createUser(UserDto: UserDto, role: roleEnum = 0): Promise<IUser> {

        // Set a default role for user
        UserDto.role = [role]

        const hash = MD5("Password", UserDto.password)
        const user = new this.userModel(_.assignIn(UserDto, { password: hash }))

        try {
            return await user.save()
        }
        catch (e) {
            console.log(e)
        }

    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec()
    }

    async getAll(): Promise<Object> {
        return await this.userModel.find().exec()
    }
}
