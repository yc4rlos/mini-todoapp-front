import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from 'src/app/shared/models/login.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkIfIsLoggedIn();
  }

  private checkIfIsLoggedIn() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser != undefined) {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmitForm() {

    if (this.loginForm.invalid) {
      this.snackbar.open('Preencha todos os campos', '', { duration: 4000 });
      return;
    }

    const login = this.loginForm.value as ILogin;
    this.authService.login(login).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  onChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
