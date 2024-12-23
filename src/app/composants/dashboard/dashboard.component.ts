import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [
      CommonModule,
      FormsModule, // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
      NgbModule,
      ReactiveFormsModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  tasks: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Erreur lors du chargement des projets', error);
      }
    );
  }

  loadTasks() {
    this.apiService.getTasks().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        console.error('Erreur lors du chargement des tâches', error);
      }
    );
  }
}
