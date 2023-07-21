import { IUser } from "./user.interface";

export interface ILoginRespose {
    token: string;
    user: IUser;
}