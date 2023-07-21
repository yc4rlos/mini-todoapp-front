import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskDataSource = [];

  displayedColumns = ['name', 'description',];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onRegisterTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '400px'
    });
  }


}
