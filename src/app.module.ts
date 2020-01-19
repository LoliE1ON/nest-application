import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const environment = process.env.NODE_ENV || 'development'

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
        envFilePath: `.env.${environment}`,
        isGlobal: true
    }),
    MongooseModule.forRoot(
        process.env.MONGODB_CONNECTION,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    ),
    UsersModule
  ],
})
export class AppModule {}
