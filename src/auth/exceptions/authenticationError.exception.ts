import {HttpException, HttpStatus} from '@nestjs/common';

export class AuthenticationError extends HttpException {
    constructor() {
        super('The login or password is incorrect', HttpStatus.FORBIDDEN);
    }
}
