import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../service/task.service';
import { Category } from '../../../model/category.model';

@Component({
  selector: 'app-task-edit',
  imports: [
    CommonModule,
    FormsModule // Ajoutez ceci pour utiliser NgIf et d'autres directives communes
  ],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: any = {};  // Utilisation d'une initialisation vide conforme à l'interface Task
  categories: Category[] = []; // Liste des catégories (si nécessaire)

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      const id = Number(taskId); // Convertir taskId en nombre
      this.taskService.getTaskById(id).subscribe((task) => {
        this.task = task;
      });
    }

    // Charger les catégories si nécessaire
    this.taskService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  goBackList(){
    this.router.navigateByUrl('tasks');
  }
  onSubmit(form: any): void {
    if (form.valid) {
      this.taskService.updateTask(this.task).subscribe(
        (updatedTask) => {
          this.router.navigate(['/tasks']); // Rediriger vers la liste des tâches après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la tâche:', error);
        }
      );
    }
  }
}
