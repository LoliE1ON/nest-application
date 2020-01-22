import {UserDto} from '../../user/dto/user.dto';

export interface IUsersList {
    readonly statusCode: number;
    readonly users: UserDto[];
}
