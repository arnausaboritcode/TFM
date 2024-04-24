import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs';

import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDTO } from '../../../../core/models/user.dto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { HeaderService } from '../../../services/header.service';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  registerForm: FormGroup;

  isValidForm: boolean | null;
  showPassword: boolean;
  showPasswordConfirmation: boolean;

  spinner: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private userService: UserService,
    private destroy$: AutoDestroyService,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.registerUser = new UserDTO('', '', '', '');
    this.isValidForm = null;
    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
    ]);
    this.confirmPassword = new FormControl(this.registerUser.confirmPassword, [
      Validators.required,
    ]);
    this.registerForm = this.formBuilder.group(
      {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      {
        validator: this.matchPasswords,
      }
    );

    this.showPassword = false;
    this.showPasswordConfirmation = false;
    this.spinner = false;
  }

  ngOnInit(): void {
    this.headerService.hide();
  }

  //Custom Validator for matched passwords
  matchPasswords(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmedPassword: string = control.get('confirmPassword')?.value;

    if (password && confirmedPassword && password !== confirmedPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    return null;
  }

  register(): void {
    this.isValidForm = false;
    let responseOK: boolean = false;
    let errorResponse: any;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    this.userService.register(this.registerUser).subscribe({
      next: (response: any) => {
        responseOK = true;
        console.log(response.message);
      },
      error: (error) => {
        responseOK = false;
        console.error(error);
      },
      complete: () => {
        this.notificationService.showSuccess(
          `<p class="text-xs">Registered as ${this.registerUser.email}</p>`
        );
        this.router.navigateByUrl('/user/login');
      },
    });

    //Spinner
    this.userService.spinner$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.spinner),
        distinctUntilChanged()
      )
      .subscribe((value) => (this.spinner = value));
  }

  /* Show/Hide passwords visibility */
  tooglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  tooglePasswordConfirmation(): void {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  /* Go back to previous page on back button */
  goBack(): void {
    this.location.back();
  }
}
