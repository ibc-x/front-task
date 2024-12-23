import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService
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
          this.toastr.error('Erreur lors du chargement du projet');
        }
      );
    } else {
      this.toastr.error('Invalid project ID.');
    }
  }

  editProject() {
    // Implémenter la logique pour modifier un projet
  }
}
