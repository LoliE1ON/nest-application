import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UserModule],
})
export class UsersModule {}
