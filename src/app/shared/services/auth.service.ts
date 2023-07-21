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

    private storedToken!: string | undefined;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    get token(): string | undefined {
        return this.storedToken || String(localStorage.getItem('token'));
    }

    login(login: ILogin) {
        return this.http.post<ILoginRespose>(`${environment.apiUrl}/auth/login`, login).pipe(tap(data => {
            if (login.remember) {
                localStorage.setItem('token', data.token);
                return;
            }

            this.storedToken = data.token;
        }));
    }

    updateToken() {
        return this.http.get<ILoginRespose>(`${environment.apiUrl}/auth/update-token`).pipe(tap(data => {
            if (!this.storedToken) {
                localStorage.setItem('token', data.token);
                return;
            }

            this.storedToken = data.token;
        }));
    }

    getCurrentUser(): IUser | undefined {

        if (this.token) {
            const user: IUser = jwtDecode(this.token);
            return user;
        }
        return;
    }

    logout() {
        this.storedToken = undefined;
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}