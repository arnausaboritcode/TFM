import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs';
import { AuthService } from '../../../../routes/services/auth.service';
import { HeaderService } from '../../../../routes/services/header.service';
import { LocalStorageService } from '../../../../routes/services/local-storage.service';
import { UserService } from '../../../../routes/services/user.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  showNav: boolean;

  spinner: boolean;

  showMenu: boolean;

  constructor(
    private navbarService: HeaderService,
    private destroy$: AutoDestroyService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.showNav = true;
    this.spinner = false;
    this.showMenu = false;
  }

  ngOnInit(): void {
    //Show/Hide full navbar
    this.navbarService.showNavbar$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.showNav = data;
      });

    //Detect route change for hiding responsive menu on change route
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = false;
      }
    });
  }

  logout(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.localStorageService.clearToken();
          this.router.navigate(['/user/login']);
        },
        error: (error) => {
          console.error(error);
        },
      });

    //Spinner
    this.authService.spinner$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.spinner),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.spinner = value;
      });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }
}
