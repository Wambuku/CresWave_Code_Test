import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service'; // Adjust the path as necessary
import { Task } from '../models/task'; // Adjust the path for Task model import as necessary

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['column1', 'column2', 'column3'];
  editTaskId: number | null = null;  // Property to track the task currently being edited

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(id: number) {
    // Navigate to the edit page
    this.router.navigate(['/tasks', id, 'edit']);  // Make sure the route is defined in your routing module
  }

  startEdit(taskId: number): void {
    this.editTaskId = taskId;
  }

  stopEdit(): void {
    if (this.editTaskId !== null) {
      const task = this.tasks.find(t => t.id === this.editTaskId);
      if (task) {
        this.taskService.updateTask(task).subscribe(() => {
          this.editTaskId = null;
          // Handle response or errors here, maybe refresh the list or show a notification
        });
      }
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
