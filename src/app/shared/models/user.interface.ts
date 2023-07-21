import { IBase } from "./base.interface";

export interface IUser extends IBase {
    name: string;
    lastname: string;
    email: string;
    password: string;
}