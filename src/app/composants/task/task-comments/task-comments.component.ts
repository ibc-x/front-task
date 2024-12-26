import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  imports: [
      CommonModule,
      FormsModule
  ],
  styleUrls: ['./task-comments.component.css']
})
export class TaskCommentsComponent implements OnInit {
  @Input() taskId?: number; // Déclarez comme optionnelle ou initialisez par défaut
  comments: any[] = [];
  newComment: string = '';

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    if (this.taskId) {
      this.apiService.getComments(this.taskId).subscribe(
        (data: any) => {
          this.comments = data;
        },
        (error: any) => {
          console.error('Erreur lors du chargement des commentaires', error);
          this.toastr.error('Erreur lors du chargement des commentaires');
        }
      );
    } else {
      console.error('Task ID is required to load comments');
    }
  }

  addComment() {
    const comment = { text: this.newComment, date: new Date() };
    if (this.taskId) {
      this.apiService.addComment(this.taskId, comment).subscribe(
        (data: any) => {
          this.comments.push(data);
          this.newComment = '';
          this.toastr.success('Commentaire ajouté avec succès');
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
          this.toastr.error('Erreur lors de l\'ajout du commentaire');
        }
      );
    } else {
      console.error('Task ID is required to add a comment');
    }
  }
}
