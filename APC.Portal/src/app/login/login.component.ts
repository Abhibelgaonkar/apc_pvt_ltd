import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.authservice.login(this.loginForm.value)
      .subscribe({
        next: (response) =>{
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.loginForm.get('email')?.setErrors({ 'incorrect': true});
        }
    });
    }
  }
}
