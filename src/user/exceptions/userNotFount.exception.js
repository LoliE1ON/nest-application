import {HttpException, HttpStatus} from '@nestjs/common';

export class UserNotFount extends HttpException {
    constructor() {
        super('This user already exists', HttpStatus.FORBIDDEN);
    }
}
