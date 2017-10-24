export class User {
    access_token: string;
    account: string;
    userID: string;
    userName: string;
    password: string;
    role: number[];
}

export enum EnumUserRole {
    巡检人员 = 1,
    台账人员 = 2,
}