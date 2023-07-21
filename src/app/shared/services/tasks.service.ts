import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateTask } from '../models/create-task.interface';
import { environment } from 'src/environments/environment';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  create(createTask: ICreateTask) {
    return this.http.post<ITask>(`${environment.apiUrl}/tasks`, createTask);
  }

}
