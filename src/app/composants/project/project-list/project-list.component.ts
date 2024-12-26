import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [
        CommonModule,
        FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
    ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  private router = inject(Router);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Erreur lors du chargement des projets', error);
        //this.toastr.error('Erreur lors du chargement des projets');
      }
    );
  }

  deleteProject(id: number) {
    this.apiService.deleteProject(id).subscribe(
      data => {
        alert("Projet supprimé avec succès !");
        //this.toastr.success('Projet supprimé avec succès');
        this.loadProjects(); // Recharger les projets après suppression
      },
      error => {
        console.error('Erreur lors de la suppression du projet', error);
      //  this.toastr.error('Erreur lors de la suppression du projet');
      }
    );
  }

  editProject(project: any) {
    this.router.navigate(['projects/'+project.id+'/edit']);
  }

  createProject() {
    this.router.navigate(['projects/new']);
    // Implémenter la logique pour créer un nouveau projet
  }
}
