import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
// import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'tasks', component: TasksTableComponent },
  { path: 'tasks/:id/edit', component: TaskDetailsComponent }

  // { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
