import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [false]
    });
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(+taskId).subscribe((task: Task) => {
        this.taskForm.patchValue(task);
      });
    }
  }

  saveTask() {
    const taskData = this.taskForm.value;
    const taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskForm.valid) {
      if (taskId) {
        this.taskService.updateTask({...taskData, id: +taskId}).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        this.taskService.addTask(taskData).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }
}