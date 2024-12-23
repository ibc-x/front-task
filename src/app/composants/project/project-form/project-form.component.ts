import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [
        CommonModule,
        FormsModule ,// Ajoutez ceci pour utiliser NgIf et d'autres directives communes
        ToastrModule
    ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Input() project: any = {};
  @Input() isEditMode: boolean = false;

  private router= inject(Router);
  //private toastr = inject(ToastrService);
  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {}

  saveProject() {
    console.log(",fdjfdfkj")
    if (this.isEditMode) {
      this.apiService.updateProject(this.project.id, this.project).subscribe(
        data => {
          //this.toastr.success('Projet mis à jour avec succès');
          alert('Projet édité avec succès')
        },
        error => {
          console.error('Erreur lors de la mise à jour du projet', error);
          //this.toastr.error('Erreur lors de la mise à jour du projet');
        }
      );
    } else {
      this.apiService.createProject(this.project).subscribe(
        data => {
          //this.toastr.success('Projet créé avec succès');
          alert('Projet créé avec succès')
          this.goBackList();
        },
        error => {
          console.error('Erreur lors de la création du projet', error);
          //this.toastr.error('Erreur lors de la création du projet');
        }
      );
    }
  }


  goBackList(){
    this.router.navigateByUrl('projects');
  }
}
