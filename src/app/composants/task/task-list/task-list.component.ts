import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [
        CommonModule,
        FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
    ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  
   private router = inject(Router);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.getTasks().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        console.error('Erreur lors du chargement des tâches', error);
        //this.toastr.error('Erreur lors du chargement des tâches');
      }
    );
  }
  
  deleteTask(id: number) {
    this.apiService.deleteTask(id).subscribe(
      data => {
        //this.toastr.success('Tâche supprimée avec succès');
        alert('Tâche supprimée avec succès');
        this.loadTasks(); // Recharger les tâches après suppression
      },
      error => {
        console.error('Erreur lors de la suppression de la tâche', error);
        // this.toastr.error('Erreur lors de la suppression de la tâche');
      }
    );
  }
  
  editTask(task: any) {
    // Implémenter la logique pour modifier une tâche
  }
  createTask() {
    this.router.navigate(['tasks/new']);
  }
}