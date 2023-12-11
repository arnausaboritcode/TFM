import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post(`${environment.api_url}/auth/login`, formData)
    .subscribe({
      next: (response: any) => {
          console.log(response.message);
          // If login successful, navigate to dashboard page
          this.router.navigate(['/dashboard']);
      },
      error: (error) => {
          console.error(error);
      }
  });
  }
}
