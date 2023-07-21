import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, finalize } from "rxjs";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthService,
        public snackbar: MatSnackBar
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        let request: HttpRequest<any> = req;

        const token = this.authService.token;
        if (token)

            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token.replace(/['"]+/g, '')}`)
            });


        return next.handle(request)
            .pipe(
                catchError(err => this.handleError(err)),
            );
    }

    handleError(err: HttpErrorResponse) {
        return new Observable(subscribe => {
            switch (err.status) {
                case 401:
                    this.snackbar.open('Usuário não autenticado.', '', { duration: 4000 });
                    this.authService.logout();
                    break;
                case 403:
                    this.snackbar.open('Você não tem permissão para essa ação.', '', { duration: 4000 });
                    break;
                case 404:
                    this.snackbar.open('Rota não encontrada.', '', { duration: 4000 });
                    break;
                case 500:
                    this.snackbar.open('Erro na API.', '', { duration: 4000 });
                    break;
                default:
                    subscribe.error(err)
                    break;
            }
            subscribe.complete();
        });
    }
}