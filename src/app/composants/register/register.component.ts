import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-register',
  imports: [ FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  register() {
    this.apiService.register(this.username, this.password, this.email).subscribe(
      data => {
        this.toastr.success('Inscription réussie', 'Bienvenue !');
      },
      error => {
        this.toastr.error('Erreur d\'inscription', 'Vérifiez vos informations');
      }
    );
  }
}
