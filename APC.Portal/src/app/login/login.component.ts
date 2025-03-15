import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  serverError: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['home']);
            this.toast.success("", "Login Sucessfull.!");
          },
          error: (error) => {
            //this.loginForm.get('email')?.setErrors({ 'incorrect': true});
            if (error.error.status == '401') {
              this.serverError = 'Invalild Email / Password.';
              this.toast.error("", "Login Fail.!");
            }
          }
        });
    }
  }
}
