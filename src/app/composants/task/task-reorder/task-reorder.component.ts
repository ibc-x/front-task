import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-task-reorder',
  imports: [
        CommonModule,
        FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
    ],
  templateUrl: './task-reorder.component.html',
  styleUrls: ['./task-reorder.component.css']
})
export class TaskReorderComponent implements OnInit {
  tasks: any[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

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
        this.toastr.error('Erreur lors du chargement des tâches');
      }
    );
  }

  markAsCompleted(task: any) {
    task.status = 'completed';
    this.apiService.updateTask(task.id, task).subscribe(
      data => {
        this.toastr.success('Tâche marquée comme terminée');
        this.loadTasks(); // Recharger les tâches après mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour de la tâche', error);
        this.toastr.error('Erreur lors de la mise à jour de la tâche');
      }
    );
  }

  markAsIncomplete(task: any) {
    task.status = 'incomplete';
    this.apiService.updateTask(task.id, task).subscribe(
      data => {
        this.toastr.success('Tâche marquée à refaire');
        this.loadTasks(); // Recharger les tâches après mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour de la tâche', error);
        this.toastr.error('Erreur lors de la mise à jour de la tâche');
      }
    );
  }
}
