import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ICreateTask } from 'src/app/shared/models/create-task.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule]
})
export class CreateTaskComponent implements OnInit {

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private snackbar: MatSnackBar,
    private tasksService: TasksService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmitForm() {
    if (this.taskForm.invalid) {
      this.snackbar.open('Preencha todos os campos', '', { duration: 4000 });
      return;
    }

    const userId = this.authService.getCurrentUser()?.id;

    const task = { ...this.taskForm.value, userId } as ICreateTask

    this.tasksService.create(task).subscribe(() => {
      this.snackbar.open('Tarefa registrada!', '', { duration: 4000 });
      this.onClose();
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}