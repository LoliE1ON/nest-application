import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';

import { configModule } from './configure.root';

const environment = process.env.NODE_ENV || 'development'

@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,
    MongooseModule.forRoot(
        process.env.MONGODB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
    ),
    UsersModule,
    TokenModule,
  ],
})
export class AppModule {}
