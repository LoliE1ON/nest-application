import {UserPublicDto} from '../../user/dto/UserPublic.dto';

export interface IUsersList {
    readonly statusCode: number;
    readonly users: UserPublicDto[];
}
