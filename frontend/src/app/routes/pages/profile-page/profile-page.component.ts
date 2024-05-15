import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UserDataDTO } from '../../../core/models/user-data.dto';
import { UserDTO } from '../../../core/models/user.dto';
import { NotificationService } from '../../../core/services/common/notification.service';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { UserService } from '../../../features/user/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  updatedUser: UserDTO;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  updateForm: FormGroup;

  isValidForm: boolean | null;
  showPassword: boolean;
  showPasswordConfirmation: boolean;
  showEditForm: boolean;

  spinner: boolean;

  //User info
  user: UserDataDTO;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private destroy$: AutoDestroyService,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.updatedUser = new UserDTO('', '', '', '');
    this.isValidForm = null;
    this.name = new FormControl(this.updatedUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.email = new FormControl(this.updatedUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.password = new FormControl(this.updatedUser.password, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
    ]);
    this.confirmPassword = new FormControl(this.updatedUser.confirmPassword, [
      Validators.required,
    ]);
    this.updateForm = this.formBuilder.group(
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
    this.showEditForm = false;
    this.spinner = false;
    this.user = new UserDataDTO(0, '', '', '', '', '');
  }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.user.email = data['userData'].email;
      this.user.name = data['userData'].name;
      this.user.created_at = data['userData'].created_at;

      //Full existing user data in update form
      this.name.setValue(this.user.name);
      this.email.setValue(this.user.email);
    });
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

  update() {
    this.isValidForm = false;

    if (this.updateForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.updatedUser = this.updateForm.value;

    this.userService
      .updateUser(this.updatedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          //Assigns new updated values to the template
          this.user.name = this.updatedUser.name;
          this.user.email = this.updatedUser.email;
          //Resets form
          this.updateForm.reset({
            name: this.user.name,
            email: this.user.email,
            password: '',
            confirmPassword: '',
          });
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.notificationService.showSuccess(
            `<p class="text-xs">Updated user succesfully</p>`
          );
        },
      });

    //Spinner
    this.userService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.spinner = value));
  }

  //Show/Hide Password toggles
  toogleShowHidePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toogleShowHidePasswordConfirmation(): void {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  //Show/Hide edit form
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  //Go back page
  goBack(): void {
    this.location.back();
  }
}
