import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.createForm();
   }

   matchPasswords(control: AbstractControl){
    const password:string = control.get('password')?.value;
    const confirmedPassword:string = control.get('confirmPassword')?.value;

    if (password && confirmedPassword && password !== confirmedPassword){
      control.get("confirmPassword")?.setErrors({ mismatch: true });
    }
    return null;
  }

   createForm() {
    this.registerForm = this.fb.group ({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern]],
      confirmPassword: [null, [Validators.required]]
    },
    {
      validator: this.matchPasswords

    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.registerForm.value.username);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('password_confirmation', this.registerForm.value.confirmPassword);

    this.http.post(`${environment.api_url}/auth/register`, formData)
    .subscribe({
      next: (response: any) => {
          console.log(response.message);
      },
      error: (error) => {
          console.error(error);
      }

  });

  this.submitted = true;
  }
}
