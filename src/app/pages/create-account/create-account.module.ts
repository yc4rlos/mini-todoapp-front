import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    CreateAccountRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
