import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { NavbarShowHideService } from '../../routes/services/navbar-show-hide.service';
import { UserStoreService } from '../../routes/services/user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  successOrFailureMessage :string = "";

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private navbarService:NavbarShowHideService, private userStoreService: UserStoreService) {
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
          //Save token because of logout
          this.userStoreService.setToken(response.token);
          this.router.navigate(['/search']);
      },
      error: (error) => {
          console.error(error);
          if (this.loginForm.value.email && this.loginForm.value.password) {
            this.successOrFailureMessage = "User not found or login failed. Please try again.";
          }
      }
  });

  this.submitted = true;
  }

  //Navbar show hide

  ngOnInit(): void {
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
  }

}
