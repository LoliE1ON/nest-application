import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { configModule } from './common/configure';
import {APP_FILTER} from '@nestjs/core';
import {AllExceptionsFilter} from './common/filters/allExceptions.filter';

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
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
    exports: [
        AuthModule,
    ],
})
export class AppModule {}
