import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { configModule } from './configure.root';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from './auth/guards/jwtAuth.guard';
import {AuthService} from './auth/auth.service';

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
    exports: [
        AuthModule,
    ],
})
export class AppModule {}
