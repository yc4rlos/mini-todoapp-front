import { IBase } from "./base.interface";

export interface IUser extends IBase {
    name: string;
    lastName: string;
    email: string;
    password: string;
}