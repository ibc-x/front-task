import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent {
  taskId: number;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
  }

  confirmDelete() {
    this.apiService.deleteTask(this.taskId).subscribe(
      data => {
        this.toastr.success('Tâche supprimée avec succès');
        this.router.navigate(['/tasks']);
      },
      error => {
        console.error('Erreur lors de la suppression de la tâche', error);
        this.toastr.error('Erreur lors de la suppression de la tâche');
      }
    );
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
