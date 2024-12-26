import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  private router = inject(Router);
    constructor(private apiService: ApiService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      const categoryId = this.route.snapshot.paramMap.get('id');
      if (categoryId) {
        const id = Number(categoryId); // Convertir taskId en nombre
        this.apiService.get<any>(`categories/${id}/edit`).subscribe({
          next:(data)=>{
            this.category = data;
          },
          error: (error)=>{
            console.log(error);
          }
        });
      }
    }
  
    saveCategory() {
      if (this.isEditMode) {
        this.apiService.updateCategory(this.category.id, this.category).subscribe(
          () => {
          this.goBackList();
           alert('Projet mis à jour avec succès');
          },
          (          error: any) => {
            console.error('Erreur lors de la mise à jour du projet', error);
            //this.toastr.error('Erreur lors de la mise à jour du projet');
          }
        );
      } else {
        this.apiService.createCategory(this.category).subscribe(
          () => {
            this.goBackList();
           alert('Projet créé avec succès');
          },
          (          error: any) => {
            console.error('Erreur lors de la création du projet', error);
            //this.toastr.error('Erreur lors de la création du projet');
          }
        );
      }
    }

    goBackList(){
      this.router.navigateByUrl('categories');
    }

  }
  


