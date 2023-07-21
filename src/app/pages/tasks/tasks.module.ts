import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [TasksComponent]
})
export class TasksModule { }
