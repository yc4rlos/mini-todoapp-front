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

  getAll(find?: string) {
    const userId = this.authService.getCurrentUser()?.id;
    return this.http.get<ITask[]>(`${environment.apiUrl}/tasks/user/${userId}${find ? '?find=' + find : ''}`);
  }

  update(id: string, createTask: ICreateTask) {
    createTask.userId = this.authService.getCurrentUser()?.id;
    return this.http.put<ITask>(`${environment.apiUrl}/tasks/${id}`, createTask);
  }

  updateComplete(id: string, value: boolean) {
    return this.http.patch<ITask>(`${environment.apiUrl}/tasks/${id}`, [{
      path: "complete",
      op: "replace",
      value: value
    }]);
  }

  create(createTask: ICreateTask) {
    createTask.userId = this.authService.getCurrentUser()?.id;
    return this.http.post<ITask>(`${environment.apiUrl}/tasks`, createTask);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
  }


}
