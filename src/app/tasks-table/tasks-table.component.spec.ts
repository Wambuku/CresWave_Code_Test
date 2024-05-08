import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task'; // Assuming you have a Task model

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
})
export class TasksTableComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  editTask(id: number) {
    // Handle navigation to the edit task view
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TasksTableComponent } from './tasks-table.component';

// describe('TasksTableComponent', () => {
//   let component: TasksTableComponent;
//   let fixture: ComponentFixture<TasksTableComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TasksTableComponent]
//     });
//     fixture = TestBed.createComponent(TasksTableComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
