
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [
      CommonModule,
      FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
    ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  private router = inject(Router);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
        //this.toastr.error('Failed to load categories.');
      }
    );
  }

  createCategory() {
    this.router.navigate(['categories/new'])
    // Logique pour créer une nouvelle catégorie
  }

  editCategory(category: Category) {
    // Logique pour modifier la catégorie
  }

  deleteCategory(id: number) {
    this.apiService.deleteCategory(id).subscribe(
      () => {
       // this.toastr.success('Category deleted successfully');
        this.loadCategories(); // Rafraîchir la liste après suppression
      },
      (error: any) => {
        //this.toastr.error('Failed to delete category.');
      }
    );
  }
}
