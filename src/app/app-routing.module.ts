import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  { path: 'tasks', component: TasksTableComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
