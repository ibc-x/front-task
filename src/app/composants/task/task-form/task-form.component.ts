import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
            FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() task: any = {};
    @Input() isEditMode: boolean = false;
  private router = inject(Router);
  
    constructor(private apiService: ApiService) { }
  
    ngOnInit(): void {}
  
    saveTask() {
      if (this.isEditMode) {
        this.apiService.updateTask(this.task.id, this.task).subscribe(
          data => {
            //this.toastr.success('Projet mis à jour avec succès');
          },
          error => {
            console.error('Erreur lors de la mise à jour du projet', error);
            //this.toastr.error('Erreur lors de la mise à jour du projet');
          }
        );
      } else {
        this.apiService.createTask(this.task).subscribe(
          data => {
            //this.toastr.success('Projet créé avec succès');
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
      this.router.navigateByUrl('tasks');
    }
  

}
