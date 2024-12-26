import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-project-edit',
  imports: [
      CommonModule,
      FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
  ],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  //  private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0); // Utilisation de l'opérateur de coalescence nulle
    if (id > 0) {
      this.apiService.getProject(id).subscribe(
        data => {
          this.project = data;
        },
        error => {
          console.error('Erreur lors du chargement du projet', error);
         alert('Erreur lors du chargement du projet');
        }
      );
    } else {
     alert('Invalid project ID.');
    }
  }

  updateProject() {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0); // Utilisation de l'opérateur de coalescence nulle
    if (id > 0) {
      this.apiService.updateProject(id, this.project).subscribe(
        data => {
         alert('Projet mis à jour avec succès');
          this.goBackList();
        },
        error => {
          console.error('Erreur lors de la mise à jour du projet', error);
         alert('Erreur lors de la mise à jour du projet');
        }
      );
    } else {
     alert('Invalid project ID.');
    }
  }
  goBackList(){
    this.router.navigateByUrl('projects');
  }
}
