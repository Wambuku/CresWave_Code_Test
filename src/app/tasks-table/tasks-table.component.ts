import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service'; 
import { Task } from '../models/task'; 

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  editTaskId: number | null = null;  

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
    this.router.navigate(['/tasks', id, 'edit']);  
  }

  startEdit(taskId: number): void {
    this.editTaskId = taskId;
  }

  stopEdit(): void {
    if (this.editTaskId !== null) {
      const task = this.tasks.find((t) => t.id === this.editTaskId);
      if (task) {
        this.taskService.updateTask(task).subscribe(() => {
          this.editTaskId = null;
         
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
