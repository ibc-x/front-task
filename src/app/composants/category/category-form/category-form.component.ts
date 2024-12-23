import { Component, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  @Input() category: any = {};
    @Input() isEditMode: boolean = false;
  
    constructor(private apiService: ApiService) { }
  
    ngOnInit(): void {}
  
    saveCategory() {
      if (this.isEditMode) {
        this.apiService.updateCategory(this.category.id, this.category).subscribe(
          () => {
            //this.toastr.success('Projet mis à jour avec succès');
          },
          (          error: any) => {
            console.error('Erreur lors de la mise à jour du projet', error);
            //this.toastr.error('Erreur lors de la mise à jour du projet');
          }
        );
      } else {
        this.apiService.createCategory(this.category).subscribe(
          () => {
            //this.toastr.success('Projet créé avec succès');
          },
          (          error: any) => {
            console.error('Erreur lors de la création du projet', error);
            //this.toastr.error('Erreur lors de la création du projet');
          }
        );
      }
    }
  }
  


