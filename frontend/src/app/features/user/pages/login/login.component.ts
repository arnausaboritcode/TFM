import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AuthDTO } from '../../../../core/models/auth.dto';
import { HeaderService } from '../../../../core/services/common/header.service';
import { LocalStorageService } from '../../../../core/services/common/local-storage.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  rememberMe: FormControl;
  loginForm: FormGroup;

  isValidForm: boolean | null;
  showPassword: boolean;

  spinner: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private LocalStorageService: LocalStorageService,
    private authService: AuthService,
    private destroy$: AutoDestroyService,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.loginUser = new AuthDTO('', '', false);
    this.isValidForm = null;
    this.email = new FormControl(this.loginUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.password = new FormControl(this.loginUser.password, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
    ]);
    this.rememberMe = new FormControl(this.loginUser.rememberMe);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });

    this.showPassword = false;
    this.spinner = false;
  }

  ngOnInit(): void {
    this.headerService.hide();
  }

  login(): void {
    this.isValidForm = false;
    let responseOK: boolean = false;

    if (this.loginForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.loginUser = this.loginForm.value;

    this.authService
      .login(this.loginUser)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          if (responseOK) {
            this.notificationService.showSuccess(
              `<p class="text-xs">Authenticated as ${this.loginUser.email}</p>`
            );
            this.router.navigateByUrl('/movies/search');
          } else {
            this.notificationService.showError(
              '<p class="text-xs">User not found or login failed</p>'
            );
          }
        })
      )
      .subscribe({
        next: (authToken: any) => {
          responseOK = true;
          //Save token because of logout
          this.LocalStorageService.setToken(
            authToken.token,
            this.loginUser.rememberMe ? localStorage : sessionStorage
          );
        },
        error: (error) => {
          responseOK = false;
          console.error(error);
        },
      });

    //Spinner
    this.authService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.spinner = value;
      });
  }

  /* Show/Hide password visibility */
  tooglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /* Go back to previous page on back button */
  goBack(): void {
    this.location.back();
  }
}
