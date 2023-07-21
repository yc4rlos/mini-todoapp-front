import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule]
})
export class HeaderComponent implements OnInit {

  currentUser!: IUser;

  constructor(
    private authService: AuthService
  ) { }

  get userInitials(): string {
    if (this.currentUser)
      return `${this.currentUser.name.at(0)}${this.currentUser.lastname.at(0)}`;
    return '';
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUser = currentUser;
    }
  }

  onLogout() {
    this.authService.logout();
  }

}
