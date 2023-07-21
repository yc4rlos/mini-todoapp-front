import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserFormComponent } from '../user-form/user-form.component';
import { IUser } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ICreateUser } from 'src/app/shared/models/create-user.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule, UserFormComponent, MatIconModule]
})
export class EditUserComponent implements OnInit {

  dataUpdated = false;

  currentUser!: IUser;

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.setUserData();
  }

  setUserData() {
    const user = this.authService.getCurrentUser();
    if (user)
      this.currentUser = user;
  }


  submitForm(userData: ICreateUser) {
    this.usersService.update(this.currentUser.id, userData).subscribe(() => {
      this.snackbar.open('Dados atualizados!', '', { duration: 4000 });
      this.authService.updateToken().subscribe();
      this.dataUpdated = true;
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
