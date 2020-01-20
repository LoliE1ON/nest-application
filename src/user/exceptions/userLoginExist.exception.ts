import {HttpException, HttpStatus} from '@nestjs/common';

export class UserLoginExist extends HttpException {
    constructor() {
        super('This login already exists', HttpStatus.FORBIDDEN);
    }
}
