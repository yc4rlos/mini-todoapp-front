import { Component } from '@angular/core';
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

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmitForm(userData: ICreateUser) {
    this.usersService.create(userData).subscribe(() => {
      this.authService.login({ email: userData.email, password: userData.password, remember: false }).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    });
  }

}
