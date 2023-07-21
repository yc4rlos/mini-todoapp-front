import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    CreateAccountRoutingModule,
    RouterModule,
    UserFormComponent
  ],
  declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
