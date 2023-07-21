import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICreateUser } from 'src/app/shared/models/create-user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  showPassword = false;

  showConfirmPassword = false;

  accountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private snackbar: MatSnackBar,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmitForm() {
    if (this.accountForm.invalid) {
      this.snackbar.open('Preencha todos os campos obrigatórios', '', { duration: 4000 });
      return;
    }

    if (!this.confirmPasswordValid) {
      this.snackbar.open('As senhas precisam ser iguais', '', { duration: 4000 });
      return;
    }

    const user = this.accountForm.value as ICreateUser;
    this.usersService.create(user).subscribe(() => {
      this.authService.login({ email: user.email, password: user.password, remember: false }).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    });
  }

  get confirmPasswordValid() {
    const password = this.accountForm.value.password;
    const confirmPassword = this.accountForm.value.confirmPassword;

    return password == confirmPassword;
  }

  onChangeConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
