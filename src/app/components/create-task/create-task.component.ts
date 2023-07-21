import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ICreateTask } from 'src/app/shared/models/create-task.interface';
import { ITask } from 'src/app/shared/models/task.interface';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule]
})
export class CreateTaskComponent implements OnInit {

  mode!: 'create' | 'edit';

  formSubmitted = false;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: ITask,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private snackbar: MatSnackBar,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.setMode();
  }

  setMode() {
    if (this.task) {
      this.mode = 'edit'
      this.setTaskValues();
      return;
    }

    this.mode = 'create';
  }

  setTaskValues() {

    const { title, description } = this.task;

    this.taskForm.setValue({
      title,
      description
    });
  }

  onSubmitForm() {
    if (this.taskForm.invalid) {
      this.snackbar.open('O Título é obrigatório', '', { duration: 4000 });
      return;
    }

    const task = { ...this.taskForm.value } as ICreateTask;

    if (this.mode == 'create') {
      this.tasksService.create(task).subscribe(() => {
        this.snackbar.open('Tarefa registrada!', '', { duration: 4000 });
        this.formSubmitted = true;
        this.onClose();
      });
      return;
    }
    this.tasksService.update(this.task.id, task).subscribe(() => {
      this.snackbar.open('Tarefa atualizada!', '', { duration: 4000 });
      this.formSubmitted = true;
      this.onClose();
    });

  }

  onClose() {
    this.dialogRef.close();
  }

}
