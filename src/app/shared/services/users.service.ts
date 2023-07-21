import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { ICreateUser } from '../models/create-user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  create(createUser: ICreateUser) {
    return this.http.post<IUser>(`${environment.apiUrl}/users`, createUser);
  }

  update(id: string, userData: ICreateUser) {
    return this.http.put<IUser>(`${environment.apiUrl}/users/${id}`, userData);
  }

}
