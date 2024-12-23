import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Méthodes pour les utilisateurs
  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/auth/signin`, { username, password });
  // }

  // register(username: string, password: string, email: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/auth/signup`, { username, password, email });
  // }

  // Méthodes pour les tâches
  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tasks`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tasks/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tasks/${id}`);
  }

  uploadTaskFiles(taskId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks/${taskId}/files`, formData);
  }

  // Méthodes pour les commentaires
  getComments(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tasks/${taskId}/comments`);
  }

  addComment(taskId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks/${taskId}/comments`, comment);
  }

  // Méthodes pour les projets
  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects`);
  }

  getProject(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects`, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${id}`);
  }

  // Méthodes pour les catégories
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  createCategory(category: any) {
    return this.http.post<any>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(id: any, category: any) {
    return this.http.put<any>(`${this.baseUrl}/categories/${id}`, category);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/categories/${id}`);
  }

  // Méthodes pour les tags
  getTags(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tags`);
  }

  createTag(tag: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tags`, tag);
  }

  updateTag(id: number, tag: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tags/${id}`, tag);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tags/${id}`);
  }

  // Méthodes pour les éléments (tâches ou projets)
  getItems(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/items`);
  }
  get<T>(url: string): Observable<T> { return this.http.get<T>(`${this.baseUrl}/${url}`);}
}
