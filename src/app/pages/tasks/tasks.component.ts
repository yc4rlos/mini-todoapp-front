import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { ITask } from 'src/app/shared/models/task.interface';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { startWith, debounceTime, switchMap, merge, Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskDataSource: ITask[] = [];

  findControl = new FormControl('');
  updateTasks = new Subject<null>();

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
    merge(this.findControl.valueChanges, this.updateTasks).pipe(
      startWith({}),
      debounceTime(500),
      switchMap(() =>
        this.tasksService.getAll(this.findControl.value as string, true))).subscribe(data => {
          this.taskDataSource = data;
        });
  }

  onRegisterTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.formSubmitted)
        this.updateTasks.next(null);

    });
  }

  onEditTask(task: ITask) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.formSubmitted)
        this.updateTasks.next(null);

    });
  }

  updateComplete(id: string, value: boolean) {
    this.tasksService.updateComplete(id, value).subscribe(() => {
      this.snackbar.open('Tarefa atualizada!', '', { duration: 4000 });
      this.updateTasks.next(null);
    });
  }

}
