import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateTask } from '../models/create-task.interface';
import { environment } from 'src/environments/environment';
import { ITask } from '../models/task.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  create(createTask: ICreateTask) {
    createTask.userId = this.authService.getCurrentUser()?.id;
    return this.http.post<ITask>(`${environment.apiUrl}/tasks`, createTask);
  }

  getAll() {
    const userId = this.authService.getCurrentUser()?.id;
    return this.http.get<ITask[]>(`${environment.apiUrl}/tasks/user/${userId}`);
  }

}
