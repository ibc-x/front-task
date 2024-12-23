import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Task } from '../model/task.model';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService: ApiService) { }

  getTasks(): Observable<Task[]> {
    return this.apiService.getTasks();
  }

  getTaskById(id: number): Observable<Task> {
    return this.apiService.getTask(id);
  }

  createTask(task: Task): Observable<Task> {
    return this.apiService.createTask(task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.apiService.updateTask(task.id, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.apiService.deleteTask(id);
  }

  getCategories(): Observable<Category[]> {
    return this.apiService.getCategories();
  }
}
