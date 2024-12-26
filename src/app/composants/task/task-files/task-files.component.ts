import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-task-files',
  templateUrl: './task-files.component.html',
  styleUrls: ['./task-files.component.scss']
})
export class TaskFilesComponent {
  selectedFiles: File[] = [];
  taskId: number = 1; // Exemple de taskId, assurez-vous de le définir dynamiquement selon votre logique

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    const formData = new FormData();
    for (let file of this.selectedFiles) {
      formData.append('files', file);
    }

    this.apiService.uploadTaskFiles(this.taskId, formData).subscribe(
      data => {
        this.toastr.success('Fichiers téléchargés avec succès');
      },
      error => {
        console.error('Erreur lors du téléchargement des fichiers', error);
        this.toastr.error('Erreur lors du téléchargement des fichiers');
      }
    );
  }
}
