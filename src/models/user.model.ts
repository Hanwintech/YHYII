/**
 * User
 */
export interface IUser {
    access_token: string;
    account: string;
    userID: string;
    userName: string;
    password: string;
}

/**
 * User
 */
export class User implements IUser {
    access_token: string;
    account: string;
    userID: string;
    userName: string;
    password: string;
}