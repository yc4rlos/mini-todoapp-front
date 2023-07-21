import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ICreateUser } from 'src/app/shared/models/create-user.interface';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatIconModule, CommonModule]
})
export class UserFormComponent {

  @Input() buttonText: string = "Cadastrar";
  @Input() data!: IUser;

  @Output('submitForm') onSubmitEvent = new EventEmitter<ICreateUser>();


  showPassword = false;

  showConfirmPassword = false;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setUserData();
  }

  setUserData() {
    if (this.data) {
      const { name, lastname, email } = this.data;
      this.userForm.patchValue({
        name, lastname, email,
        password: '', confirmPassword: ''
      });
    }
  }

  get confirmPasswordValid() {
    const password = this.userForm.value.password;
    const confirmPassword = this.userForm.value.confirmPassword;

    return password == confirmPassword;
  }

  onSubmitForm() {
    if (this.userForm.invalid) {
      this.snackbar.open('Preencha os campos com dados válidos', '', { duration: 4000 });
      return;
    }

    if (!this.confirmPasswordValid) {
      this.snackbar.open('As senhas precisam ser iguais', '', { duration: 4000 });
      return;
    }

    const user = this.userForm.value as ICreateUser;

    this.onSubmitEvent.emit(user);
  }

  onChangeConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
