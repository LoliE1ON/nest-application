import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import * as _ from 'lodash'
import { MD5 } from 'crypto-js'

import { IUser } from "./interfaces/user.interface";
import { CreateUserDto } from './dto/create.user.dto'

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async create(CreateUserDto: CreateUserDto): Promise<IUser> {

        const hash = MD5("Password", CreateUserDto.password)
        const user = new this.userModel(_.assignIn(CreateUserDto, { password: hash }))
        return await user.save()

    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec()
    }

}
