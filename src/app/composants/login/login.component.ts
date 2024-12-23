import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  msg = '';
  constructor(private router: Router, private service: AuthService,) {
    
    
  }
  
  form = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.check(this.form.value.uname!, this.form.value.password!);
  }
  
  check(uname: string, p: string) {

    this.service.login(uname, p).subscribe({
      next:(token)=>{
        this.router.navigate(["dashboard"]);
        console.log('res',token);
      },
      error:(error)=>{
        console.log('msg',error);
        this.msg = 'Nom utilisateur ou mot de passe incorrect !';
      }
    });
  }


}