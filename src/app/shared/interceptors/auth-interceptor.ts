import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, finalize } from "rxjs";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly loaderService: LoaderService,
        private readonly authService: AuthService,
        public snackbar: MatSnackBar
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        let request: HttpRequest<any> = req;

        const hideLoader = req.headers.get('hide-loader');

        console.log(hideLoader)

        if (!hideLoader)
            this.loaderService.show();

        const token = this.authService.token;
        if (token)

            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token.replace(/['"]+/g, '')}`)
            });


        return next.handle(request)
            .pipe(
                catchError(err => this.handleError(err)),
                finalize(() => {
                    setTimeout(() => {
                        if (!hideLoader)
                            this.loaderService.hide();

                    }, 400);
                })
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
                    this.snackbar.open('Dados não encontrados.', '', { duration: 4000 });
                    break;
                case 400:
                    this.snackbar.open(err.error, '', { duration: 4000 });
                    break;
                default:
                    subscribe.error(err)
                    break;
            }
            subscribe.complete();
        });
    }
}