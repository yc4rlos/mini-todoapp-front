import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { ITask } from 'src/app/shared/models/task.interface';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskDataSource: ITask[] = [];

  displayedColumns = ['name', 'description',];

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setTaskDataSource();
  }

  setTaskDataSource() {
    this.tasksService.getAll().subscribe(data => {
      this.taskDataSource = data;
    });
  }

  onRegisterTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.formSubmitted)
        this.setTaskDataSource();

    });
  }

  onEditTask(task: ITask) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.formSubmitted)
        this.setTaskDataSource();

    });
  }

  updateComplete(id: string, value: boolean) {
    this.tasksService.updateComplete(id, value).subscribe(() => {
      this.snackbar.open('Tarefa atualizada!', '', { duration: 4000 });
      this.setTaskDataSource();
    });
  }

}
