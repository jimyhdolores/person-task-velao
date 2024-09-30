import { Injectable } from '@angular/core';
import { IAdminTask, ITask } from '../models/task.interface';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _tasks: IAdminTask[] = [];

  addTask(task: ITask) {
    this._tasks.push({ complete: false, task });
  }

  getTasks() {
    console.log('--');

    return this._tasks;
  }
}
