import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema'

import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
