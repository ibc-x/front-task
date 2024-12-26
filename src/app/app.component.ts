import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './model/task.model';
import { TaskService } from './service/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  title = 'Taskmanager';
  tasks: Task[] = [];
  
  // Initialisation de newTask ici
  newTask: Task = { 
    id: 0, 
    title: '', 
    description: '', 
    completed: false, 
    version: 1, 
    user: { id: 0, username: '', password: '', version: 1 }, // Initialisation correcte
    category: {
      id: 0, name: '', tasks: [],
      description: ''
    } // Initialisation correcte
  };

  isConnected = false;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isConnected = this.authService.isAuthenticated();
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (donnes: Task[]) => {
        console.log(donnes);
        this.tasks = donnes;
      },
      (erreur: HttpErrorResponse) => {
        console.log(erreur);
      }
    );
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe((task: Task) => {
      this.tasks.push(task);
      this.resetNewTask(); // Réinitialiser le formulaire
    });
  }

  // Autres méthodes...
  
  private resetNewTask() {
    this.newTask = { 
      id: 0, 
      title: '', 
      description: '', 
      completed: false, 
      version: 1, 
      user: { id: 0, username: '', password: '', version: 1 }, // Réinitialisation correcte
      category: { id: 0, name: '', tasks: [], description:'' } // Réinitialisation correcte
    };
  }
}
