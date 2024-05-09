import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task'; // Assuming you have a Task model

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(id: number) {
    // Implement navigation or logic to edit a task
    console.log('Editing task:', id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      // Update the tasks list after deleting
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
