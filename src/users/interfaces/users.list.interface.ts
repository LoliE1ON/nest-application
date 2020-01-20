import {UserPublicDto} from "../../user/dto/UserPublic.dto";

export interface IUsersList {
    statusCode: Number
    users: UserPublicDto[]
}