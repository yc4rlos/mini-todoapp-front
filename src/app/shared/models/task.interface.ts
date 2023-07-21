import { IBase } from "./base.interface";
import { ICreateTask } from "./create-task.interface";

export interface ITask extends ICreateTask, IBase {
    complete: boolean;
}