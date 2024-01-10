import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  successOrFailureMessage :string = "";

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
    this.loginForm = this.fb.group ({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);

    this.http.post(`${environment.api_url}/auth/login`, formData)
    .subscribe({
      next: (response: any) => {
          console.log(response.message);
          //this.successOrFailureMessage = "User logged in succesfully...";
          // If login successful, navigate to dashboard page
          this.router.navigate(['/home']);
      },
      error: (error) => {
          console.error(error);
          if (this.loginForm.value.email && this.loginForm.value.password) {
            this.successOrFailureMessage = "User not found or login failed.";
          }
      }
  });

  this.submitted = true;
  }
}
