import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../models/login.interface';
import { environment } from 'src/environments/environment';
import { ILoginRespose } from '../models/login-response.interface';
import { tap } from 'rxjs';
import { IUser } from '../models/user.interface';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private token!: string | undefined;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(login: ILogin) {
        return this.http.post<ILoginRespose>(`${environment.apiUrl}/auth/login`, login).pipe(tap(data => {
            if (login.remember) {
                localStorage.setItem('token', data.token);
                return;
            }

            this.token = data.token;
        }));
    }

    getCurrentUser(): IUser | undefined {
        const token = this.token || String(localStorage.getItem('token'));
        if (token) {
            const user: IUser = jwtDecode(token);
            return user;
        }
        return;
    }

    logout() {
        this.token = undefined;
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}